export interface ICarTypeRequest {
    type:string;
    price:number;
}

export interface ICarTypeResponse {
    id:number;
    type:string;
    price:number;
}


export interface ICarRequest {
    carTypeId: number;
    brand:string;
    model:string
}

export interface ICarResponse {
    id:number;
    carType: ICarTypeResponse;
    brand:string;
    model:string
}