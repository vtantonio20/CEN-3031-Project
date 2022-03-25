import { ViewModule } from './view/view.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { AddCourseFormComponent } from './add-course-form/add-course-form.component';



@NgModule({
  declarations: [
    AppComponent,
    AddCourseFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ViewModule,
    FormsModule,
    SharedModule,
    provideDatabase(() => getDatabase()),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    //services
    ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
