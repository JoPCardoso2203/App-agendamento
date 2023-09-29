import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-add-agendamento',
  templateUrl: './add-agendamento.component.html',
  styleUrls: ['./add-agendamento.component.scss']
})
export class AddAgendamentoComponent {
  AddAgendamentoForm: agendamentoForm = new agendamentoForm();

  dataMin: Date = new Date();
  dataMax: Date = new Date();
  janelas: any[] = [];
  motoristas: any[] = [];
  public horas: string = "";

  @ViewChild("agendamentoForm")
  agendamentoForm!: NgForm;

  isSubmitted: boolean = false;
  agendamentoId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { 
      this.dataMax.setDate(this.dataMin.getDate() + 30);
    }

  ngOnInit(): void {
    this.agendamentoId = this.route.snapshot.params['idAgendamento'];
    if(this.motoristas.length > 0)
      this.AddAgendamentoForm.IdMotorista = this.motoristas.find(m => m.placa == this.AddAgendamentoForm.Placa).idMotorista;
  }
  

  public AlterarData(){
    this.janelas = [];
    this.PreencherHorarios();
  }

  public PreencherHorarios(){
    var horaJanela: number = 0;

    if(this.AddAgendamentoForm.DataInicioJanela == this.formatDate(new Date()))
      horaJanela = new Date().getHours() + 2;

    for(var hora:number = (horaJanela); hora < 24; hora++){
      this.janelas.push(hora);
    }

  }

  BuscarTransportadora(){
    this.httpProvider.getTransportadoraPorCnpj(this.AddAgendamentoForm.Cnpj).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.AddAgendamentoForm.IdTransportadora = resultData.idTransportadora;
          this.AddAgendamentoForm.Transportadora = resultData.razaoSocial;
          this.BuscarMotoristasTransportadora();
        }
      }
      else{
        this.AddAgendamentoForm.IdTransportadora = 0;
        this.AddAgendamentoForm.Transportadora = "";
        this.AddAgendamentoForm.Placa = "";
        this.motoristas = [];
        this.toastr.error("Transportadora não encontrada");
      }
    },
      (error: any) => { });
  }

  BuscarMotoristasTransportadora(){
    this.httpProvider.getMotoristasPorTransportadora(this.AddAgendamentoForm.IdTransportadora).subscribe((data: any) => {
      if (data != null && data.body != null && data.body.length > 0) {
        this.motoristas = data.body;
        this.AddAgendamentoForm.IdMotorista = data.body[0].idMotorista
        this.AddAgendamentoForm.Placa = data.body[0].placa
      }
      else{
        this.AddAgendamentoForm.Placa = "";
        this.motoristas = [];
        this.toastr.error("Não há motoristas vinculados a essa transportadora.");
      }
    },
      (error: any) => { });
  }

  AlterarPlaca(){
    this.AddAgendamentoForm.Placa = this.motoristas.find(m => m.idMotorista == this.AddAgendamentoForm.IdMotorista).placa
  }

  salvarAgendamento(isValid: any) {
    this.isSubmitted = true;

    if (isValid) {
      this.AddAgendamentoForm.DataInicioJanela = this.AddAgendamentoForm.DataInicioJanela + "T" + this.AddAgendamentoForm.HoraJanela.toString().padStart(2,'0') + ":00:00"
      this.httpProvider.salvarAgendamento(this.AddAgendamentoForm).subscribe(async (data: any) => {
        if (data != null && data.status == 200) {
          this.toastr.success("Agendamento cadastrado com sucesso");
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      },
        async (error: any) => {
          this.toastr.error(error.error.message);
        });
      this.AddAgendamentoForm.DataInicioJanela = this.formatDate(new Date(this.AddAgendamentoForm.DataInicioJanela));
    }
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

export class agendamentoForm {
  IdAgendamento: number = 0;
  NumeroConteiner: string = "";
  DataInicioJanela: string = "";
  HoraJanela: string = "";
  IdMotorista: number = 0;
  NomeMotorista: string = "";
  Placa: string = "";
  Cnpj: string = "";
  Transportadora: string = "";
  IdTransportadora: number = 0;
}