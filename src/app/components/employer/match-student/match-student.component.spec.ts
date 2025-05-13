import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchStudentComponent } from './match-student.component';

describe('MatchStudentComponent', () => {
  let component: MatchStudentComponent;
  let fixture: ComponentFixture<MatchStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
