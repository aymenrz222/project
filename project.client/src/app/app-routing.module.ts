import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ListProjetComponent } from './list-projet/list-projet.component';
import { MembreComponent } from './membre/membre.component';
const routes: Routes = [
{path:'side-bar',component:SideBarComponent},
{path:'list-projet',component:ListProjetComponent},
{path:'membre',component:MembreComponent},
{path:'',component:ListProjetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
