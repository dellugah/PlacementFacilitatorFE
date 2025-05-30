import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementOffersComponent } from './placement-offers.component';

describe('PlacementOffersComponent', () => {
  let component: PlacementOffersComponent;
  let fixture: ComponentFixture<PlacementOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
