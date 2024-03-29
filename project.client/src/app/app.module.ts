import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

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
          MembreViewComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
