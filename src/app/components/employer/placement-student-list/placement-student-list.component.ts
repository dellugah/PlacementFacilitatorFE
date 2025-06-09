import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PlacementDTO, ProfileDTO} from '../../../DTOs/ProfileDTO';
import {ActivatedRoute} from '@angular/router';
import {ConnectionService} from '../../../services/connection/connection.service';
import {ProfileService} from '../../../services/profileServices/profile.service';
import {BehaviorSubject, combineLatest, filter, map, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-placement-student-list',
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage,
    AsyncPipe
  ],
  templateUrl: './placement-student-list.component.html',
  styleUrl: './placement-student-list.component.css'
})
/**
 * Component responsible for displaying and managing a list of students for a specific placement.
 * Handles offering and revoking placements to students, and maintains synchronized state
 * between route parameters and profile updates.
 */
export class PlacementStudentListComponent implements OnInit, OnDestroy {
  private placementSubject = new BehaviorSubject<PlacementDTO>(new PlacementDTO());
  placement$ = this.placementSubject.asObservable();
  private destroy$ = new Subject<void>();

  /**
   * Initializes the component with required services.
   * @param route - For accessing route parameters
   * @param connection - Service for making HTTP requests
   * @param profile - Service for managing profile data
   * @param cdr - For manual change detection
   */
  constructor(
    private route: ActivatedRoute,
    protected connection: ConnectionService,
    protected profile: ProfileService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Initializes the component by subscribing to route parameters and profile updates.
   * Combines the latest data from both sources to maintain an up-to-date view
   * of the placement and its potential candidates.
   */
  ngOnInit() {
    // Subscribe to both route params and profile changes
    combineLatest([
      this.route.queryParams.pipe(
        filter(params => !!params['data']),
        map(params => JSON.parse(params['data']) as PlacementDTO)
      ),
      this.profile.profile
    ]).pipe(
      takeUntil(this.destroy$),
      map(([routePlacement, profile]) => {
        // Get the most up-to-date placement data
        const currentPlacement = profile.placements?.find(p =>
          p.placementId === routePlacement.placementId
        ) || routePlacement;

        console.log('Combined placement data:', currentPlacement);
        return currentPlacement;
      })
    ).subscribe(placement => {
      this.placementSubject.next(placement);
      this.cdr.detectChanges();
    });
  }

  /**
   * Offers a placement to a specific student.
   * Makes an API call to create the connection between student and placement,
   * then updates the local state with the response.
   * @param studentId - The ID of the student to offer the placement to
   */
  protected async offerPlacement(studentId: number | undefined) {
    if (!studentId) return;

    const placementId = this.placementSubject.getValue().placementId;
    if (!placementId) return;

    try {
      const response = await this.connection.postConnection({
        studentId,
        placementId
      }, 'employer/offer-placement');

      if (response && typeof response === 'object') {
        const profileData = response as ProfileDTO;
        this.profile.profile.next(profileData);

        const updatedPlacement = profileData.placements?.find(p =>
          p.placementId === placementId
        );
        if (updatedPlacement) {
          this.placementSubject.next(updatedPlacement);
        }
      }
    } catch (error) {
      console.error('Error offering placement:', error);
    }
  }


  /**
   * Revokes a placement offer from a specific student.
   * Sends a request to remove the connection between student and placement,
   * then updates the local state to reflect the change.
   * @param studentId - The ID of the student to revoke the placement from
   */
  protected async revokePlacement(studentId: number | undefined) {
    if (!studentId) return;

    const placementId = this.placementSubject.getValue().placementId;
    if (!placementId) return;

    try {
      console.log('Revoking placement for student:', studentId);

      const response = await this.connection.postConnection({
        studentId,
        placementId
      }, 'employer/revoke-student');

      console.log('Revoke response:', response);

      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response data');
      }

      const profileData = response as ProfileDTO;

      // Update the profile first
      this.profile.profile.next(profileData);

      // Get the latest placement data
      const updatedPlacement = profileData.placements?.find(p =>
        p.placementId === placementId
      );

      if (updatedPlacement) {
        // Update the placement with the latest data
        this.placementSubject.next({
          ...updatedPlacement,
          potentialCandidates: updatedPlacement.potentialCandidates?.filter(
            candidate => candidate.profileId !== studentId
          )
        });
      }

      this.cdr.detectChanges();

    } catch (error) {
      console.error('Error revoking placement:', error);
    }
  }

  /**
   * Cleanup method that completes all subscriptions when the component is destroyed
   * to prevent memory leaks.
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

