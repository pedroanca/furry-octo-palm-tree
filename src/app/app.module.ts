import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { NewObjectComponent } from './components/new-object/new-object.component';
import {FirebaseService} from './services/firebase/firebase.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ListDataComponent } from './components/list-data/list-data.component';
import {KeysPipe} from './pipes/keys/keys.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {RouterModule} from '@angular/router';
import {AppRouting} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NewObjectComponent,
    ListDataComponent,
    KeysPipe,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AppRouting
  ],
  providers: [
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
