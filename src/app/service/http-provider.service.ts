import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "https://localhost:7286/";

var httpLink = {
  urlAgendamento:  apiUrl + "Agendamento",
  urlTransportadora: apiUrl + "Transportadora",
  urlMotorista: apiUrl + "Motorista"
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  //Requisições de Agendamento
  public getAgendamentos(): Observable<any> {
    return this.webApiService.get(httpLink.urlAgendamento + '/ListaAgendamento');
  }
  public getAgendamentoPorId(id: any): Observable<any> {
    return this.webApiService.get(httpLink.urlAgendamento + '/AgendamentoPorId' + '?id=' + id)
  }
  public cancelarAgendamento(id: any): Observable<any> {
    return this.webApiService.delete(httpLink.urlAgendamento + '/CancelarAgendamento'+ '?id=' + id)
  }
  public salvarAgendamento(form: any): Observable<any> {
    return this.webApiService.post(httpLink.urlAgendamento + '/SalvarAgendamento', form)
  }

  //Requisições de Motorista
  public getMotoristas(): Observable<any> {
    return this.webApiService.get(httpLink.urlMotorista + '/ListaMotorista');
  }
  public getMotoristasPorTransportadora(idTransportadora: any): Observable<any> {
    return this.webApiService.get(httpLink.urlMotorista + '/ListaMotoristaPorTransportadora'+ '?id=' + idTransportadora);
  }
  public getMotoristasPorCpf(cpf: any): Observable<any> {
    return this.webApiService.get(httpLink.urlMotorista + '/MotoristaPorCpf'+ '?cpf=' + cpf);
  }
  public getMotoristaPorId(id: any): Observable<any> {
    return this.webApiService.get(httpLink.urlMotorista + '/MotoristaPorId'+ '?id=' + id);
  }
  public cancelarMotorista(id: any): Observable<any> {
    return this.webApiService.delete(httpLink.urlMotorista + '/CancelarMotorista'+ '?id=' + id)
  }
  public salvarMotorista(form: any): Observable<any> {
    return this.webApiService.post(httpLink.urlMotorista + '/SalvarMotorista', form)
  }

  //Requisições de Transportadora
  public getTransportadoras(): Observable<any> {
    return this.webApiService.get(httpLink.urlTransportadora + '/ListaTransportadora');
  }
  public getTransportadoraPorId(id: any): Observable<any> {
    return this.webApiService.get(httpLink.urlTransportadora + '/TransportadoraPorId'+ '?id=' + id);
  }
  public getTransportadoraPorCnpj(cnpj: any): Observable<any> {
    return this.webApiService.get(httpLink.urlTransportadora + '/TransportadoraPorCnpj'+ '?cnpj=' + cnpj);
  }
  public cancelarTransportadora(id: any): Observable<any> {
    return this.webApiService.delete(httpLink.urlTransportadora + '/CancelarTransportadora'+ '?id=' + id)
  }
  public cancelarVinculo(id: any, idMotorista: any): Observable<any> {
    return this.webApiService.delete(httpLink.urlTransportadora + '/CancelarVinculo'+ '?idTransportadora=' + id + "&idMotorista=" + idMotorista)
  }
  public salvarTransportadora(form: any): Observable<any> {
    return this.webApiService.post(httpLink.urlTransportadora + '/SalvarTransportadora', form)
  }
  public salvarVinculo(id: any, idMotorista: any): Observable<any> {
    return this.webApiService.post(httpLink.urlTransportadora + '/SalvarVinculo', { IdTransportadora: id, IdMotorista: idMotorista})
  }
}                          