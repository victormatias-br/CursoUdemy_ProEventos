import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  {path: 'eventos', component: EventosComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'contatos', component: ContatosComponent},
  {path: 'palestrantes', component: PalestrantesComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // caso não seja informada a rota
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full' } // caso seja escrito alguma rota não mapeada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
