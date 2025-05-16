import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementStudentListComponent } from './placement-student-list.component';

describe('PlacementStudentListComponent', () => {
  let component: PlacementStudentListComponent;
  let fixture: ComponentFixture<PlacementStudentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementStudentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
