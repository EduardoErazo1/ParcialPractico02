import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'

//firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

//Service
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guard/auth.guard";
import { ComboBoxComponent } from './components/combo-box/combo-box.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list.component';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';
import { ClienteService } from './services/cliente.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ComboBoxComponent,
    ClientesComponent,
    ClienteListComponent,
    ClienteComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    AngularFirestoreModule, 
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, ClienteService], //Agregamos a los providers el guard
  bootstrap: [AppComponent]
})
export class AppModule { }