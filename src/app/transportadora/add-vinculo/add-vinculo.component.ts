import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from 'src/app/service/http-provider.service';

@Component({
  selector: 'app-add-vinculo',
  templateUrl: './add-vinculo.component.html',
  styleUrls: ['./add-vinculo.component.scss']
})
export class AddVinculoComponent {
  addVinculo: vinculoForm = new vinculoForm();

  dataMin: Date = new Date();
  dataMax: Date = new Date();
  janelas: string[] = [];

  @ViewChild("addVinculoForm")
  addVinculoForm!: NgForm;

  isSubmitted: boolean = false;
  transportadoraId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { 
      this.dataMax.setDate(this.dataMin.getDate() + 30) ;
      console.log(this.dataMax)
    }

  ngOnInit(): void {
    this.transportadoraId = this.route.snapshot.params['idTransportadora'];
    this.getTransportadoraPorId();
  }

  getTransportadoraPorId() {       
    this.httpProvider.getTransportadoraPorId(this.transportadoraId).subscribe((data : any) => {      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.addVinculo.Cnpj = resultData.cnpj;
          this.addVinculo.RazaoSocial = resultData.razaoSocial;
          this.addVinculo.IdTransportadora = this.transportadoraId;
        }
      }
    },
    (error :any)=> { }); 
  }

  public BuscarMotorista(){
    this.httpProvider.getMotoristasPorCpf(this.addVinculo.Cpf).subscribe((data: any) => {
      if (data != null && data.body != null) {
        this.addVinculo.Nome = data.body.nome;
        this.addVinculo.IdMotorista = data.body.idMotorista;
      }
      else{
        this.addVinculo.Nome = "";
        this.addVinculo.IdMotorista = 0;
        this.toastr.error("Motorista não encontrado!");
      }
      console.log(data)
    },
      (error: any) => { });
  }

  salvarVinculo(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.salvarVinculo(this.addVinculo.IdTransportadora, this.addVinculo.IdMotorista).subscribe(async (data: any) => {
        if (data != null && data.status == 200) {
          this.toastr.success("Transportadora cadastrada com sucesso");
          setTimeout(() => {
            this.router.navigate(['/ViewTransportadora/' + this.transportadoraId]);
          }, 500);
        }
      },
      async (error: any) => {
        if(error.error.errors != null && error.error.errors != undefined)
          this.toastr.error(Object.values(error.error.errors)[0] as string);
        else{this.toastr.error(error.error.message);}
      });
    }
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

export class vinculoForm {
  IdTransportadora: number = 0;
  Cnpj: string = "";
  RazaoSocial: string = "";
  IdMotorista: number = 0;
  Nome: string = "";
  Cpf: string = "";
}