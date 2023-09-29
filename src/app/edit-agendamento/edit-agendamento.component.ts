import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-edit-agendamento',
  templateUrl: './edit-agendamento.component.html',
  styleUrls: ['./edit-agendamento.component.scss']
})
export class EditAgendamentoComponent {
  editAgendamentoForm: agendamentoForm = new agendamentoForm();

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
    this.getAgendamentoPorId();
    if(this.motoristas.length > 0)
      this.editAgendamentoForm.IdMotorista = this.motoristas.find(m => m.placa == this.editAgendamentoForm.Placa).idMotorista;
  }
  getAgendamentoPorId() {
    this.httpProvider.getAgendamentoPorId(this.agendamentoId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editAgendamentoForm.IdAgendamento = resultData.idAgendamento;
          this.editAgendamentoForm.NumeroConteiner = resultData.numeroConteiner;
          this.editAgendamentoForm.DataInicioJanela = this.formatDate(new Date(resultData.dataInicioJanela));
          this.editAgendamentoForm.HoraJanela = new Date(resultData.dataInicioJanela).getHours().toString().padStart(2,'0');
          this.editAgendamentoForm.NomeMotorista = resultData.nomeMotorista;
          this.editAgendamentoForm.Placa = resultData.placa;
          this.editAgendamentoForm.Transportadora = resultData.transportadora;
          this.editAgendamentoForm.Cnpj = resultData.cnpj;

          this.janelas = [this.editAgendamentoForm.HoraJanela];


          this.PreencherHorarios();
          this.BuscarTransportadora();
        }
      }
    },
      (error: any) => { });
  }

  public AlterarData(){
    this.janelas = [];
    this.PreencherHorarios();
  }

  public PreencherHorarios(){
    var horaJanela: number = 0;

    if(this.editAgendamentoForm.DataInicioJanela == this.formatDate(new Date()))
      horaJanela = new Date().getHours() + 2;

    for(var hora:number = (horaJanela); hora < 24; hora++){
      this.janelas.push(hora);
    }

  }

  BuscarTransportadora(){
    this.httpProvider.getTransportadoraPorCnpj(this.editAgendamentoForm.Cnpj).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editAgendamentoForm.IdTransportadora = resultData.idTransportadora;
          this.editAgendamentoForm.Transportadora = resultData.razaoSocial;
          this.BuscarMotoristasTransportadora();
        }
      }
      else{
        this.editAgendamentoForm.IdTransportadora = 0;
        this.editAgendamentoForm.Transportadora = "";
        this.editAgendamentoForm.Placa = "";
        this.motoristas = [];
        this.toastr.error("Transportadora não encontrada");
      }
    },
      (error: any) => { });
  }

  BuscarMotoristasTransportadora(){
    this.httpProvider.getMotoristasPorTransportadora(this.editAgendamentoForm.IdTransportadora).subscribe((data: any) => {
      if (data != null && data.body != null && data.body.length > 0) {
        this.motoristas = data.body;
        this.editAgendamentoForm.IdMotorista = data.body[0].idMotorista
        this.editAgendamentoForm.Placa = data.body[0].placa
      }
      else{
        this.editAgendamentoForm.Placa = "";
        this.motoristas = [];
        this.toastr.error("Não há motoristas vinculados a essa transportadora.");
      }
    },
      (error: any) => { });
  }

  AlterarPlaca(){
    this.editAgendamentoForm.Placa = this.motoristas.find(m => m.idMotorista == this.editAgendamentoForm.IdMotorista).placa
  }

  salvarAgendamento(isValid: any) {
    this.isSubmitted = true;

    if (isValid) {
      this.editAgendamentoForm.DataInicioJanela = this.editAgendamentoForm.DataInicioJanela + "T" + this.editAgendamentoForm.HoraJanela + ":00:00"
      this.httpProvider.salvarAgendamento(this.editAgendamentoForm).subscribe(async (data: any) => {
        if (data != null && data.status == 200) {
          this.toastr.success("Agendamento alterado com sucesso");
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      },
        async (error: any) => {
          this.toastr.error(error.error.message);
        });
      this.editAgendamentoForm.DataInicioJanela = this.formatDate(new Date(this.editAgendamentoForm.DataInicioJanela));
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