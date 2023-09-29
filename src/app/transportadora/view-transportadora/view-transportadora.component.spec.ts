import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransportadoraComponent } from './view-transportadora.component';

describe('ViewTransportadoraComponent', () => {
  let component: ViewTransportadoraComponent;
  let fixture: ComponentFixture<ViewTransportadoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTransportadoraComponent]
    });
    fixture = TestBed.createComponent(ViewTransportadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
