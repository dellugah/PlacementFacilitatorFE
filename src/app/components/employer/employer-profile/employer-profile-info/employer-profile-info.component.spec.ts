import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerProfileInfoComponent } from './employer-profile-info.component';

describe('EmployerProfileInfoComponent', () => {
  let component: EmployerProfileInfoComponent;
  let fixture: ComponentFixture<EmployerProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerProfileInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
