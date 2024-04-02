import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ListProjetComponent } from './list-projet/list-projet.component';
import { MembreComponent } from './membre/membre.component';


const routes: Routes = [
{
  path: '',
  component: SideBarComponent,
  children: [
    {path: 'list-projet', component:ListProjetComponent},
    {path: 'membre',component:MembreComponent}
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
