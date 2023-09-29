import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from 'src/app/service/http-provider.service';
import { WebApiService } from 'src/app/service/web-api.service';

@Component({
  selector: 'app-view-motorista',
  templateUrl: './view-motorista.component.html',
  styleUrls: ['./view-motorista.component.scss']
})
export class ViewMotoristaComponent {
  motoristaId: any;
  motoristaDetalhes : any= [];
   
  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService) { }
  ngOnInit(): void {
    this.motoristaId = this.route.snapshot.params['idMotorista'];   
    console.log(this.motoristaId)   
    this.getMotoristaPorId();
  }
  
  getMotoristaPorId() {       
    this.httpProvider.getMotoristaPorId(this.motoristaId).subscribe((data : any) => {      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.motoristaDetalhes = resultData;
        }
      }
    },
    (error :any)=> { }); 
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
