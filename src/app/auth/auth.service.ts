import { Injectable } from '@angular/core';
// imports agregados por mi
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Usuario } from './user';
import { AuthRespuesta } from './auth-respuesta';
import { RespuestaLogin } from './respuesta-login';
import { EnvService } from '../services/env.service';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private  clienteHttp:  HttpClient, private almacenamiento: Storage, private env: EnvService) { }

  NOMBRE_SERVIDOR = 'http://localhost:8000';
  authSubject  = new BehaviorSubject(false);
  token: any;
  isLoggedIn = false;

  registrar(user: Usuario) : Observable<AuthRespuesta> {
    return this.clienteHttp.post<AuthRespuesta>(`${this.NOMBRE_SERVIDOR}/register`, user).pipe(
      tap(async (resp:  AuthRespuesta ) => {
        // si el servidor me acepta los datos
        if (resp.user) {
          // como proceso la respuesta del servidor
          await this.almacenamiento.set("ACCESS_TOKEN", resp.user.access_token);
          await this.almacenamiento.set("EXPIRES_IN", resp.user.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }

  logear1(user: Usuario) : Observable<AuthRespuesta>{
    return this.clienteHttp.post<AuthRespuesta>(`${this.NOMBRE_SERVIDOR}/oauth/token`, user).pipe(
      tap(async (resp:  AuthRespuesta ) => {
        // si el servidor me acepta los datos
        if (resp.user) {
          // como proceso la respuesta del servidor
          // almacenar el token en el cache 
          await this.almacenamiento.set("ACCESS_TOKEN", resp.user.access_token);
          // alamacena la expiracion del token
          await this.almacenamiento.set("EXPIRES_IN", resp.user.expires_in);

          // retornar
          this.authSubject.next(true);
        }
      })
    );
  }


  logear(email: string, password: string ) {
    const datos = {
      email,
      password,
    };

    return this.clienteHttp.post(`${this.NOMBRE_SERVIDOR}/api/login`, datos)
      .pipe(
        tap( token => {
          console.log(token);
          // almacenar el token en el cache
          this.almacenamiento.set('token', token)
          .then(
            () => {
              console.log('Token stored:' +  token);
              this.isLoggedIn = true;
            },
            error => {
              console.error('Error storing item', error);
            }
          );

        })
      );

  }

  logout() {

    const headers = new HttpHeaders({
      Authorization: this.token['token_type'] + ' ' + this.token['access_token']
    });

    return this.clienteHttp.get(this.env.API_URL + '/api/logout', { headers })
    .pipe(
      tap(data => {
        this.almacenamiento.remove('token');
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }

  user() {
    const headers = new HttpHeaders({
      Authorization: this.token['token_type'] + ' ' + this.token['access_token']
    });
    return this.clienteHttp.get<User>(this.env.API_URL + 'api/user', { headers })
    .pipe(
      tap(user => {
        return user;
      })
    );
  }

  getToken() {
    return this.almacenamiento.get('token').then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }

  estaLogueado() {
    return this.authSubject.asObservable();
  }
}
