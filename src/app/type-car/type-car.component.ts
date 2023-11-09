import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { TypeCarService } from '../services/type-car.service';
import {  ICarTypeRequest } from 'src/models/CarType';

@Component({
  selector: 'app-type-car',
  templateUrl: './type-car.component.html',
  styleUrls: ['./type-car.component.css']
})
export class TypeCarComponent implements OnInit {

  constructor(private fb: FormBuilder, private carTypeService: TypeCarService) { }

  private allowedTypes = ['sedan', 'coupe', 'hatchback', 'convertible', 'roadster', 'suv', 'minivan', 'pickup', 'rover']

  formCarType = this.fb.group({
    'type': ['', [Validators.required, Validators.minLength(3),this.allowedTypeValidator(this.allowedTypes)]],
    'price': [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]]
  })

  get type() {
    return this.formCarType.get('type') as FormControl;
  }
  get price() {
    return this.formCarType.get('price') as FormControl;
  }

  ngOnInit() {
  }

  postCarType() {
    if (this.formCarType.valid) {
      const formValue = this.formCarType.value;

    const carTypeData: ICarTypeRequest = {
      type: formValue.type!,
      price: formValue.price!
    };

      this.carTypeService.postCarType(carTypeData).subscribe({
        next: (response) => {
          alert('Tipo de auto cargado con éxito');
          console.log('Creado Exitosamente', response);
          this.resetForm();
        },
        error: (error: any) => {
          console.error('Error al crear', error);
        }
      });
    }
  }
  
  resetForm() {
    this.formCarType.reset({
      'type': '',
    'price': null
    })
  }



  allowedTypeValidator(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      const valueLowerCase = value.toLowerCase();
      
      if (allowedTypes.includes(valueLowerCase)) {
        return null; // La validación pasa
      }
  
      return { 'invalidType': true }; // La validación falla
    };
  }
 
}
