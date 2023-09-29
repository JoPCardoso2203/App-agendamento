import { Component, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { NgModalConfirm } from '../home/home.component';

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.component.html',
  styleUrls: ['./motorista.component.scss']
})
export class MotoristaComponent {
  closeResult = '';
  ListaMotorista: any = [];
  constructor(private router: Router, private modalService: NgbModal,
    private toastr: ToastrService, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.getMotoristas();
  }
  async getMotoristas() {
    this.httpProvider.getMotoristas().subscribe((data : any) => {
      console.log(data)
      if (data != null && data.body != null) {
        var resultData = data.body;
        console.log(resultData)
        if (resultData) {
          this.ListaMotorista = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.ListaMotorista = [];
            }
          }
        }
      });
  }

  AddMotorista() {
    this.router.navigate(['AddMotorista']);
  }

  deleteMotoristaConfirmacao(employee: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteMotorista(employee);
      },
        (reason) => {});
  }

  deleteMotorista(motorista: any) {
    this.httpProvider.cancelarMotorista(motorista.idMotorista).subscribe((data : any) => {
      if (data != null && data.status == 200) {
          this.toastr.success("Registro apagado com sucesso.");
          this.getMotoristas();
      }
    },
    (error : any) => {});
  }

  public formatCpf(value: string): string {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
  }

  public formatCnh(value: string): string {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.replace(/(\d{3})(\d{4})(\d{4})$/, '$1.$2.$3'); // Aplica a máscara
    return value;
  }
}
