import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedVehicleComponent } from './featured-vehicle.component';

describe('FeaturedVehicleComponent', () => {
  let component: FeaturedVehicleComponent;
  let fixture: ComponentFixture<FeaturedVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
