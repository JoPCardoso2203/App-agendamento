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
  selector: 'app-transportadora',
  templateUrl: './transportadora.component.html',
  styleUrls: ['./transportadora.component.scss']
})

export class TransportadoraComponent {
  closeResult = '';
  ListaTransportadora: any = [];
  constructor(private router: Router, private modalService: NgbModal,
    private toastr: ToastrService, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.getTransportadoras();
  }
  async getTransportadoras() {
    this.httpProvider.getTransportadoras().subscribe((data : any) => {
      console.log(data)
      if (data != null && data.body != null) {
        var resultData = data.body;
        console.log(resultData)
        if (resultData) {
          this.ListaTransportadora = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.ListaTransportadora = [];
            }
          }
        }
      });
  }

  AddTranportadora() {
    this.router.navigate(['AddTransportadora']);
  }

  deleteTransportadoraConfirmacao(transportadora: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteTransportadora(transportadora);
      },
        (reason) => {});
  }

  deleteTransportadora(transportadora: any) {
    this.httpProvider.cancelarTransportadora(transportadora.idTransportadora).subscribe((data : any) => {
        if(data.status == 200){
          this.toastr.success('Registro apagado com sucesso.');
          this.getTransportadoras();
        }
    },
    (error : any) => {});
  }

  public formatCnpj(value: string): string {
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
    return value;
  }
}
