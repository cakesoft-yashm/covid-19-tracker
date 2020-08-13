import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiaDashbordComponent } from './india-dashbord.component';

describe('IndiaDashbordComponent', () => {
  let component: IndiaDashbordComponent;
  let fixture: ComponentFixture<IndiaDashbordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiaDashbordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiaDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
