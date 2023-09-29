import { Component } from '@angular/core';
import { WebApiService } from '../service/web-api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-view-agendamento',
  templateUrl: './view-agendamento.component.html',
  styleUrls: ['./view-agendamento.component.scss']
})
export class ViewAgendamentoComponent {

  agendamentoId: any;
  agendamentoDetalhes : any= [];
   
  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService) { }
  
  ngOnInit(): void {
    this.agendamentoId = this.route.snapshot.params['idAgendamento'];   
    console.log(this.agendamentoId)   
    this.getAgendamentoPorId();
  }
  
  getAgendamentoPorId() {       
    this.httpProvider.getAgendamentoPorId(this.agendamentoId).subscribe((data : any) => {      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.agendamentoDetalhes = resultData;
        }
      }
    },
    (error :any)=> { }); 
  }

}
