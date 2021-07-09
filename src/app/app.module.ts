import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SuperService } from './service/super.service';
import { DocumentCreator } from './cv-generator';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    SuperService,
    DocumentCreator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
