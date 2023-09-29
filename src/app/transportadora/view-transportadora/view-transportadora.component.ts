import { Component, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgModalConfirm } from 'src/app/home/home.component';
import { HttpProviderService } from 'src/app/service/http-provider.service';
import { WebApiService } from 'src/app/service/web-api.service';

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-view-transportadora',
  templateUrl: './view-transportadora.component.html',
  styleUrls: ['./view-transportadora.component.scss']
})
export class ViewTransportadoraComponent {
  
  transportadoraId: any;
  transportadoraDetalhes : any= [];
  listaVinculos: any = [];
   
  constructor(public webApiService: WebApiService, private router: Router, private modalService: NgbModal, private toastr: ToastrService,
    private route: ActivatedRoute, private httpProvider : HttpProviderService) { }
  ngOnInit(): void {
    this.transportadoraId = this.route.snapshot.params['idTransportadora'];   
    console.log(this.transportadoraId)   
    this.getTransportadoraPorId();
    this.BuscarMotoristasTransportadora();
  }

  AddVinculo() {
    this.router.navigate(['AddVinculo/' + this.transportadoraId]);
  }

  BuscarMotoristasTransportadora(){
    this.httpProvider.getMotoristasPorTransportadora(this.transportadoraId).subscribe((data: any) => {
      if (data != null && data.body != null && data.body.length > 0) {
        this.listaVinculos = data.body;
        console.log(this.listaVinculos)
      }
      console.log(data)
    },
      (error: any) => { });
  }

  deleteVinculoConfirmacao(vinculo: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteVinculo(vinculo);
      },
        (reason) => {});
  }

  deleteVinculo(vinculo: any) {
    this.httpProvider.cancelarVinculo(vinculo.idTransportadora, vinculo.idMotorista).subscribe((data : any) => {
        if(data.status == 200){
          this.toastr.success('Registro apagado com sucesso.');
          this.BuscarMotoristasTransportadora();
        }
    },
    (error : any) => {});
  }
  
  getTransportadoraPorId() {       
    this.httpProvider.getTransportadoraPorId(this.transportadoraId).subscribe((data : any) => {      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.transportadoraDetalhes = resultData;
        }
      }
    },
    (error :any)=> { }); 
  }

  public formatCnpj(value: string): string {
    if(value != null){
      value = value.replace(/\D/g, '');
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    return value;
  }

  public formatCpf(value: string): string {
    if(value != null){
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value;
  }

  public formatCnh(value: string): string {
    if(value != null){
      value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
      value = value.replace(/(\d{3})(\d{4})(\d{4})$/, '$1.$2.$3'); // Aplica a máscara
    }
    return value;
  }
}
