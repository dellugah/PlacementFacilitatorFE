import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileInfoComponent } from './student-profile-info.component';

describe('StudentProfileInfoComponent', () => {
  let component: StudentProfileInfoComponent;
  let fixture: ComponentFixture<StudentProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfileInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
