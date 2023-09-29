import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TransportadoraComponent } from './transportadora/transportadora.component';
import { MotoristaComponent } from './motorista/motorista.component';
import { ViewAgendamentoComponent } from './view-agendamento/view-agendamento.component';
import { EditAgendamentoComponent } from './edit-agendamento/edit-agendamento.component';
import { ViewTransportadoraComponent } from './transportadora/view-transportadora/view-transportadora.component';
import { EditTransportadoraComponent } from './transportadora/edit-transportadora/edit-transportadora.component';
import { ViewMotoristaComponent } from './motorista/view-motorista/view-motorista.component';
import { EditMotoristaComponent } from './motorista/edit-motorista/edit-motorista.component';
import { AddAgendamentoComponent } from './add-agendamento/add-agendamento.component';
import { AddMotoristaComponent } from './motorista/add-motorista/add-motorista.component';
import { AddTransportadoraComponent } from './transportadora/add-transportadora/add-transportadora.component';
import { AddVinculoComponent } from './transportadora/add-vinculo/add-vinculo.component';
const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full'},
  { path: 'Home', component: HomeComponent },
  { path: 'AddAgendamento', component: AddAgendamentoComponent},
  { path: 'ViewAgendamento/:idAgendamento', component: ViewAgendamentoComponent},
  { path: 'EditAgendamento/:idAgendamento', component: EditAgendamentoComponent},
  { path: 'Transportadora', component: TransportadoraComponent },
  { path: 'AddTransportadora', component: AddTransportadoraComponent},
  { path: 'ViewTransportadora/:idTransportadora', component: ViewTransportadoraComponent},
  { path: 'EditTransportadora/:idTransportadora', component: EditTransportadoraComponent},
  { path: 'AddVinculo/:idTransportadora', component: AddVinculoComponent},
  { path: 'Motorista', component: MotoristaComponent },
  { path: 'AddMotorista', component: AddMotoristaComponent},
  { path: 'ViewMotorista/:idMotorista', component: ViewMotoristaComponent},
  { path: 'EditMotorista/:idMotorista', component: EditMotoristaComponent}
];
 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }