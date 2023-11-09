import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AddCarService } from "../services/add-car.service";
import { Observable, catchError, map, of, switchMap } from "rxjs";

export class ModelExistenceValidator {
    static createValidator(carService: AddCarService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const model = control.value;
  
        return of(model).pipe(
          switchMap(value => {
            return carService.checkModelExistence(value).pipe(
              map(exists => (exists ? { modelExists: true } : null)),
              catchError(() => of(null))
            );
          })
        );
      };
    }
  }