import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TransportadoraComponent } from './transportadora/transportadora.component';
import { AddTransportadoraComponent } from './transportadora/add-transportadora/add-transportadora.component';
import { EditTransportadoraComponent } from './transportadora/edit-transportadora/edit-transportadora.component';
import { ViewTransportadoraComponent } from './transportadora/view-transportadora/view-transportadora.component';
import { MotoristaComponent } from './motorista/motorista.component';
import { AddMotoristaComponent } from './motorista/add-motorista/add-motorista.component';
import { EditMotoristaComponent } from './motorista/edit-motorista/edit-motorista.component';
import { ViewMotoristaComponent } from './motorista/view-motorista/view-motorista.component';
import { AddAgendamentoComponent } from './add-agendamento/add-agendamento.component';
import { EditAgendamentoComponent } from './edit-agendamento/edit-agendamento.component';
import { ViewAgendamentoComponent } from './view-agendamento/view-agendamento.component';
import { AddVinculoComponent } from './transportadora/add-vinculo/add-vinculo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransportadoraComponent,
    AddTransportadoraComponent,
    EditTransportadoraComponent,
    ViewTransportadoraComponent,
    MotoristaComponent,
    AddMotoristaComponent,
    EditMotoristaComponent,
    ViewMotoristaComponent,
    AddAgendamentoComponent,
    EditAgendamentoComponent,
    ViewAgendamentoComponent,
    AddVinculoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }