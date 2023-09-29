import { Component, Input, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Confirmação</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Você realmente deseja deletar o registro?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCELAR</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}
const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  closeResult = '';
  ListaAgendamento: any = [];
  constructor(private router: Router, private modalService: NgbModal,
    private toastr: ToastrService, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.getAgendamentos();
  }
  async getAgendamentos() {
    this.httpProvider.getAgendamentos().subscribe((data : any) => {
      console.log(data)
      if (data != null && data.body != null) {
        var resultData = data.body;
        console.log(resultData)
        if (resultData) {
          this.ListaAgendamento = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.ListaAgendamento = [];
            }
          }
        }
      });
  }

  AddAgendamento() {
    this.router.navigate(['AddAgendamento']);
  }

  deleteAgendamentoConfirmacao(employee: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteAgendamento(employee);
      },
        (reason) => {});
  }

  deleteAgendamento(agendamento: any) {
    this.httpProvider.cancelarAgendamento(agendamento.idAgendamento).subscribe((data : any) => {
      if (data != null && data.status == 200) {
          this.toastr.success("Registro apagado com sucesso.");
          this.getAgendamentos();
      }
    },
    (error : any) => {});
  }
}