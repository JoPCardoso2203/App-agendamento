import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAgendamentoComponent } from './edit-agendamento.component';

describe('EditAgendamentoComponent', () => {
  let component: EditAgendamentoComponent;
  let fixture: ComponentFixture<EditAgendamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAgendamentoComponent]
    });
    fixture = TestBed.createComponent(EditAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
