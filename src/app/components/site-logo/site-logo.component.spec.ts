import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLogoComponent } from './site-logo.component';

describe('SiteLogoComponent', () => {
  let component: SiteLogoComponent;
  let fixture: ComponentFixture<SiteLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteLogoComponent]
    });
    fixture = TestBed.createComponent(SiteLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
