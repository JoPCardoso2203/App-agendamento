import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgendamentoComponent } from './view-agendamento.component';

describe('ViewAgendamentoComponent', () => {
  let component: ViewAgendamentoComponent;
  let fixture: ComponentFixture<ViewAgendamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAgendamentoComponent]
    });
    fixture = TestBed.createComponent(ViewAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
