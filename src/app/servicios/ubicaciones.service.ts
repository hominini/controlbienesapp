import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from  '@angular/common/http';
import { Observable, BehaviorSubject } from  'rxjs';
import { tap } from  'rxjs/operators';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  constructor(private  clienteHttp:  HttpClient) { }


  NOMBRE_SERVIDOR:  string  =  'http://localhost:8000/api';
  authSubject  =  new  BehaviorSubject(false);
  

  /*
  private ubicaciones: {id: number, nombre: string}[] = [
    { "id": 0, "nombre": "biblioteca"},
    { "id": 1, "nombre": "aula 1"},
    { "id": 2, "nombre": "aula 2"},
    { "id": 3, "nombre": "oficina 1"},
    { "id": 4, "nombre": "rectorado"},
  ];
  */

  private ubicaciones: any;

  // PENDIENTE coger desde api
  obtenerUbicaciones() {

    const headers = new HttpHeaders({
      // tslint:disable-next-line: max-line-length
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhjN2I4ZTBlZTg1NGYxMjIwYWFlZTcxOTA3YmI5ZmM1MGNlZTUzYzc1OGEwMDNmNDVlZTQ4N2U4YWI4NGQ4M2IwNTRkMjk2ZmEzZGZlNTQwIn0.eyJhdWQiOiI0IiwianRpIjoiOGM3YjhlMGVlODU0ZjEyMjBhYWVlNzE5MDdiYjlmYzUwY2VlNTNjNzU4YTAwM2Y0NWVlNDg3ZThhYjg0ZDgzYjA1NGQyOTZmYTNkZmU1NDAiLCJpYXQiOjE1NjY0OTY0MzIsIm5iZiI6MTU2NjQ5NjQzMiwiZXhwIjoxNTk4MTE4ODMxLCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.fyCt8X6RhXQHJYJypBqEAQYvJlqX_VCuAWNV2jHux53quaSecYSQX2943xPAFokzNHClId8G300z3gDIVf86Wzlv8HUJinb5EV5Kx2Ia9FgtNX93dGdrHhdJIKEDlIZoyUvgzl1_aJ8mLYONd31VQh6LWdTK-A8YaqqCSCu0cbhJx8LBmy6LepvYPTHJyPlFofMm8Rq_RL-aNldtBJo-XbmpcTBlCtVmkW_HdRx_GR1AgP2UGZ84GvqBiR4uvyxdADvk9snYqvSkuCVKHNWdr5fVcHQbuQ5ocpXQZath3D74ZzlH9JluhSWZnYQmbOXaWsaqXufSwI19KYp5yQK7jJ551JwXq7rxpNgieMI0Sv1Ra3bC-Ktxn5o-Ytt8rhtu5eURBXk84DBH5AYCN6nbB9fJkol5IIrlEHUGzt5MhLJZCl_S5UFMos_ZLefdqPMSU6XpbIn7aJBZlZOEnpN4ehIgGwxQ94giMQkW1wnEfQefw7lpST0JsQBV1LoYIDb9VDFJnK7l_x4gUTMnvmBedgOxd459Rbcjry0OKOvLvVfoZtPIli8sgfPBbzdIGB4hQ94mKOznauEQDwJs3Dt0uQeS8DMUFJa-vwuDJMxZpZP4_mJYtvK_BocBJs4WB94gD_ftRCis4BbrbpuGDynKQG6Zx_0pvFdPROvP3Nc2mug',
      Accept: 'application/json',
    });

    this.ubicaciones = this.clienteHttp.get(`${this.NOMBRE_SERVIDOR}/ubicaciones`, {headers, responseType: 'json'})
    .subscribe(
      map(data => {
      // console.log(data.status);
      console.log(data); // data received by server
      console.log("dsflkjdskdkl"); // data received by server

      // console.log(data.headers);
      return data;
    },
    (error: any) => {
        console.log(error);
    }));
    return this.ubicaciones;
  }


}
