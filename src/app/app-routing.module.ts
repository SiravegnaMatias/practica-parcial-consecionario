import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeCarComponent } from './type-car/type-car.component';
import { AddCarComponent } from './add-car/add-car.component';

const routes: Routes = [
  {path: 'type-car', component:TypeCarComponent},
  {path: 'add-car', component:AddCarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
