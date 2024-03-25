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
import { UserComponent } from './user/user.component';
import { MembreComponent } from './membre/membre.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ListProjetComponent,
    AjoutComponent,
    EditComponent,
    DeleteComponent,
    ViewComponent,
    UserComponent,
    MembreComponent
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
