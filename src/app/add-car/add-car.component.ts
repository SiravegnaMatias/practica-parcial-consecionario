import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ICarRequest, ICarResponse, ICarTypeResponse } from 'src/models/CarType';
import { TypeCarService } from '../services/type-car.service';
import { AddCarService } from '../services/add-car.service';
import { ModelExistenceValidator } from '../Validators/ModelExistenceValidator';
@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  constructor(private fb: FormBuilder, private carTypeService: TypeCarService, private carService: AddCarService) { }


  ngOnInit() {
    this.carTypeService.getCarTypes().subscribe({
      next: (carTypes: ICarTypeResponse[]) => {
        this.carTypes = carTypes;
        console.log('Lista de CarTypes:', this.carTypes);
      },
      error: (error) => {
        console.error('Error al obtener la lista de CarTypes:', error);
      }
    });
  }
  carTypes: ICarTypeResponse[] = [];

  formCar = this.fb.group({
    'typeCar': [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]], 
    'brand': ['', [Validators.required, Validators.minLength(3)]],
    'model': ['', [Validators.required, Validators.minLength(3)]]
  })
  
  ngAfterViewInit() {
    const modelControl = this.formCar.get('model') as FormControl;
    modelControl.setValidators([Validators.required, Validators.minLength(3)]);
    modelControl.updateValueAndValidity();
    modelControl.setAsyncValidators(ModelExistenceValidator.createValidator(this.carService));
    modelControl.updateValueAndValidity();
  }

  get typeCar() {
    return this.formCar.get('typeCar') as FormControl;
  }

  get brand() {
    return this.formCar.get('brand') as FormControl;
  }

  get model() {
    return this.formCar.get('model') as FormControl;
  }

  postCar() {
    if (this.formCar.valid && this.formCar.value.typeCar !== null && this.formCar.value.typeCar !== undefined) {
      const formCarValue = this.formCar.value;
      const carTypeId = typeof formCarValue.typeCar === 'string' ? parseInt(formCarValue.typeCar, 10) : formCarValue.typeCar;
  
      const carData: ICarRequest = {
        carTypeId: carTypeId!,
        brand: formCarValue.brand!,
        model: formCarValue.model!
      };
  
      this.carService.postCar(carData).subscribe({
        next: (carResponse: ICarResponse) => {
          alert('Auto cargado con éxito');
          console.log('Operación exitosa', carResponse);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error en la operación', error);
        }
      });
    }
  }
  
  resetForm() {
    this.formCar.reset({
      'typeCar': null,
      'brand': '',
      'model': ''
    });
  }

  
}
