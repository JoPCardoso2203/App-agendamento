import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransportadoraComponent } from './add-transportadora.component';

describe('AddTransportadoraComponent', () => {
  let component: AddTransportadoraComponent;
  let fixture: ComponentFixture<AddTransportadoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTransportadoraComponent]
    });
    fixture = TestBed.createComponent(AddTransportadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
