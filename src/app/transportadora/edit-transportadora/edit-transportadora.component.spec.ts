import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransportadoraComponent } from './edit-transportadora.component';

describe('EditTransportadoraComponent', () => {
  let component: EditTransportadoraComponent;
  let fixture: ComponentFixture<EditTransportadoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTransportadoraComponent]
    });
    fixture = TestBed.createComponent(EditTransportadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
