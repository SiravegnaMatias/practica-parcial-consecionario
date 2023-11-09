import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarRequest, ICarResponse } from 'src/models/CarType';

@Injectable()
export class AddCarService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "http://localhost:8080/cars"

  postCar(car: ICarRequest): Observable<ICarResponse> {
    return this.httpClient.post<ICarResponse>(`${this.apiUrl}`, car);
  }

  //El metodo para validar modelo existente devuelve falso si existe
  //Puedo cargar este y la respuesta es falso si existe... verdadero si no existe
  checkModelExistence(model: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiUrl}/get-by-model?model=${model}`);
  }
}
