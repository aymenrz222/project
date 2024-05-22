import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ListProjetComponent } from './list-projet/list-projet.component';
import { AjoutComponent } from './ajout/ajout.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { ViewComponent } from './view/view.component';

import { MembreComponent } from './membre/membre.component';
import { MembreAjoutComponent } from './membre-ajout/membre-ajout.component';
import { MembreEditComponent } from './membre-edit/membre-edit.component';
import { MembreDeletComponent } from './membre-delet/membre-delet.component';
import { MembreViewComponent } from './membre-view/membre-view.component';
import { TasksComponent } from './tasks/tasks.component';
import { PopupTasksComponent } from './popup-tasks/popup-tasks.component';
import { PopupSidebarComponent } from './popup-sidebar/popup-sidebar.component';
import { TasksDeleteComponent } from './tasks-delete/tasks-delete.component';
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { TasksEditComponent } from './tasks-edit/tasks-edit.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProjetService } from './services/projet.service';
import { MembreService } from './services/membre.service';
import { TacheService } from './services/tache.service';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
<<<<<<< HEAD
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GanttComponent } from './gantt/gantt.component';
=======
import { AccueilComponent } from './accueil/accueil.component';
>>>>>>> 9b89885dec132785cb690e0f1c605fbccd18f480


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ListProjetComponent,
    AjoutComponent,
    EditComponent,
    DeleteComponent,
    ViewComponent,
    MembreComponent,

          MembreAjoutComponent,
          MembreEditComponent,
          MembreDeletComponent,
          MembreViewComponent,
          TasksComponent,
          PopupTasksComponent,
          PopupSidebarComponent,
          TasksDeleteComponent,
          TasksViewComponent,
          TasksEditComponent,
          TopBarComponent,
          DashbordComponent,
          LoginComponent,
          AboutComponent,
          ContactComponent,
<<<<<<< HEAD
          GanttComponent,
=======
          AccueilComponent,
>>>>>>> 9b89885dec132785cb690e0f1c605fbccd18f480
        

  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,BrowserModule,

    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    MatInputModule
   
  ],
  providers: [ProjetService,MembreService,TacheService , DatePipe, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
