import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCarComponent } from './add-car/add-car.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeCarComponent } from './type-car/type-car.component';
import { TypeCarService } from './services/type-car.service';
import { HttpClientModule } from '@angular/common/http';
import { AddCarService } from './services/add-car.service';

@NgModule({
  declarations: [	
    AppComponent,TypeCarComponent,AddCarComponent
      
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    
  ],
  providers: [TypeCarService,AddCarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
