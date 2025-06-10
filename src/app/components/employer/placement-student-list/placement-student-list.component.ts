import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PlacementDTO, ProfileDTO} from '../../../DTOs/ProfileDTO';
import {ActivatedRoute, Router} from '@angular/router';
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
  // BehaviorSubject to manage the current placement state
  private placementSubject = new BehaviorSubject<PlacementDTO>(new PlacementDTO());
  // Observable to expose the placement data to the template
  placement$ = this.placementSubject.asObservable();
  // Subject for managing component lifecycle and cleanup
  private destroy$ = new Subject<void>();

  /**
   * Initializes the component with required services.
   * @param route - For accessing route parameters
   * @param connection - Service for making HTTP requests
   * @param profile - Service for managing profile data
   * @param cdr - For manual change detection
   * @param router
   */
  constructor(
    private route: ActivatedRoute,
    protected connection: ConnectionService,
    protected profile: ProfileService,
    private cdr: ChangeDetectorRef,
    private router : Router,
  ) {}

  /**
   * Initializes the component by subscribing to route parameters and profile updates.
   * Combines the latest data from both sources to maintain an up-to-date view
   * of the placement and its potential candidates.
   */
  ngOnInit() {
    // Combine latest values from route parameters and profile updates
    combineLatest([
      // Extract and parse placement data from route query parameters
      this.route.queryParams.pipe(
        // Only proceed if 'data' parameter exists
        filter(params => !!params['data']),
        // Parse JSON string into PlacementDTO object
        map(params => JSON.parse(params['data']) as PlacementDTO)
      ),
      // Get current profile data
      this.profile.profile
    ]).pipe(
      // Unsubscribe when component is destroyed
      takeUntil(this.destroy$),
      // Combine route placement with profile data
      map(([routePlacement, profile]) => {
        // Find matching placement in profile or use route placement as fallback
        const currentPlacement = profile.placements?.find(p =>
          p.placementId === routePlacement.placementId
        ) || routePlacement;

        console.log('Combined placement data:', currentPlacement);
        return currentPlacement;
      })
    ).subscribe(placement => {
      // Update placement subject with combined data
      this.placementSubject.next(placement);
      // Trigger change detection
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
    // Validate student ID
    if (!studentId) return;

    // Get current placement ID
    const placementId = this.placementSubject.getValue().placementId;
    // Validate placement ID
    if (!placementId) return;

    try {
      // Send offer placement request to server
      const response = await this.connection.postConnection({
        studentId,
        placementId
      }, 'employer/offer-placement');

      // Handle successful response
      if (response && typeof response === 'object') {
        // Update profile with new data
        const profileData = response as ProfileDTO;
        this.profile.profile.next(profileData);

        // Find and update the current placement
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
    // Validate student ID
    if (!studentId) return;

    // Get current placement ID
    const placementId = this.placementSubject.getValue().placementId;
    // Validate placement ID
    if (!placementId) return;

    try {
      console.log('Revoking placement for student:', studentId);

      // Send revoke placement request to server
      const response = await this.connection.postConnection({
        studentId,
        placementId
      }, 'employer/revoke-student');

      console.log('Revoke response:', response);

      // Validate response format
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response data');
      }

      // Update profile with new data
      const profileData = response as ProfileDTO;
      this.profile.profile.next(profileData);

      // Find updated placement in profile
      const updatedPlacement = profileData.placements?.find(p =>
        p.placementId === placementId
      );

      // Update placement and filter out revoked student
      if (updatedPlacement) {
        this.placementSubject.next({
          ...updatedPlacement,
          potentialCandidates: updatedPlacement.potentialCandidates?.filter(
            candidate => candidate.profileId !== studentId
          )
        });
      }

      // Trigger change detection
      this.cdr.detectChanges();

    } catch (error) {
      console.error('Error revoking placement:', error);
    }
  }

  /**
   * Cleanup method that completes all subscriptions when the component is destroyed
   * to prevent memory leaks.
   */

  protected async goToMatchingPage(){
    let placement = this.placementSubject.getValue();
    await this.router.navigate(['employer/matching'], {
      queryParams: { data: JSON.stringify(placement) }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

