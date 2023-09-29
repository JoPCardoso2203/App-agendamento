import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from 'src/app/service/http-provider.service';

@Component({
  selector: 'app-add-transportadora',
  templateUrl: './add-transportadora.component.html',
  styleUrls: ['./add-transportadora.component.scss']
})
export class AddTransportadoraComponent {
  addTransportadoraForm: transportadoraForm = new transportadoraForm();

  dataMin: Date = new Date();
  dataMax: Date = new Date();
  janelas: string[] = [];

  @ViewChild("motoristaForm")
  motoristaForm!: NgForm;

  isSubmitted: boolean = false;
  motoristaId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { 
      this.dataMax.setDate(this.dataMin.getDate() + 30) ;
      console.log(this.dataMax)
    }

  ngOnInit(): void {
    this.motoristaId = this.route.snapshot.params['idMotorista'];
  }

  salvarTransportadora(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.salvarTransportadora(this.addTransportadoraForm).subscribe(async (data: any) => {
        if (data != null && data.status == 200) {
          this.toastr.success("Transportadora cadastrada com sucesso");
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