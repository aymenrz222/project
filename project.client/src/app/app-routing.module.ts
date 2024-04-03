import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ListProjetComponent } from './list-projet/list-projet.component';
import { MembreComponent } from './membre/membre.component';
import { TasksComponent } from './tasks/tasks.component';
import { TopBarComponent } from './top-bar/top-bar.component';

const routes: Routes = [
  { path: '',
   component:TopBarComponent },
{  path: '',
  component: SideBarComponent, 
 
  children: [
    {path: 'list-projet', component:ListProjetComponent},
    {path: 'membre',component:MembreComponent},
    {path: 'tasks',component:TasksComponent},
  ]
  
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
