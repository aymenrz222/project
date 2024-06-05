import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ListProjetComponent } from './list-projet/list-projet.component';
import { MembreComponent } from './membre/membre.component';
import { TasksComponent } from './tasks/tasks.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AccueilComponent } from './accueil/accueil.component';



const routes: Routes = [
  // Redirect root path to login
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
 
  {
     path: '',
    component: SideBarComponent, 
    children: [
      { path: 'dashbord', component: DashbordComponent },
      { path: 'list-projet/:pagenumber', component: ListProjetComponent },
      { path: 'membre', component: MembreComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'accueil', component:AccueilComponent},

      { path: '', redirectTo: 'list-projet', pathMatch: 'full' }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
