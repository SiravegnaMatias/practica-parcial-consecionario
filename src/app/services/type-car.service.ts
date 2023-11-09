import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ICarTypeRequest, ICarTypeResponse } from 'src/models/CarType';

@Injectable()
export class TypeCarService {

    constructor(private httpClient: HttpClient) { }

    private apiUrl = "http://localhost:8080/Car-type";


    postCarType(carType:ICarTypeRequest): Observable<ICarTypeResponse> {
        return this.httpClient.post<ICarTypeResponse>(`${this.apiUrl}`,carType);
    }

    getCarTypes(): Observable<ICarTypeResponse[]> {
        return this.httpClient.get<ICarTypeResponse[]>(`${this.apiUrl}/get-all`);
    }

}

