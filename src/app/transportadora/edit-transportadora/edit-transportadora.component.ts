import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from 'src/app/service/http-provider.service';

@Component({
  selector: 'app-edit-transportadora',
  templateUrl: './edit-transportadora.component.html',
  styleUrls: ['./edit-transportadora.component.scss']
})
export class EditTransportadoraComponent {
  editTransportadoraForm: transportadoraForm = new transportadoraForm();

  dataMin: Date = new Date();
  dataMax: Date = new Date();
  janelas: string[] = [];

  @ViewChild("transportadoraForm")
  transportadoraForm!: NgForm;

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
    this.httpProvider.getTransportadoraPorId(this.transportadoraId).subscribe((data: any) => {
      console.log(data)
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editTransportadoraForm.IdTransportadora = resultData.idTransportadora;
          this.editTransportadoraForm.RazaoSocial = resultData.razaoSocial;
          this.editTransportadoraForm.NomeFantasia = resultData.nomeFantasia;
          this.editTransportadoraForm.Cnpj = resultData.cnpj;
        }
      }
    },
      (error: any) => { });
  }

  AddTransportadora(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.salvarTransportadora(this.editTransportadoraForm).subscribe(async (data: any) => {
        if (data != null && data.status == 200) {
          this.toastr.success("Transportadora alterada com sucesso");
          setTimeout(() => {
            this.router.navigate(['/Transportadora']);
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

export class transportadoraForm {
  IdTransportadora: number = 0;
  RazaoSocial: string = "";
  NomeFantasia: string = "";
  Cnpj: string = "";
}