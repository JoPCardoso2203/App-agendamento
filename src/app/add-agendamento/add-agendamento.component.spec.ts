import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgendamentoComponent } from './add-agendamento.component';

describe('AddAgendamentoComponent', () => {
  let component: AddAgendamentoComponent;
  let fixture: ComponentFixture<AddAgendamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAgendamentoComponent]
    });
    fixture = TestBed.createComponent(AddAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
