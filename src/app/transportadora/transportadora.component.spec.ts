import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportadoraComponent } from './transportadora.component';

describe('TransportadoraComponent', () => {
  let component: TransportadoraComponent;
  let fixture: ComponentFixture<TransportadoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportadoraComponent]
    });
    fixture = TestBed.createComponent(TransportadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
