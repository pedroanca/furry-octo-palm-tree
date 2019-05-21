import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../environments/environment';

import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {StateObjectService} from '../stateObject/state-object.service';
import {ObjetoFirebase} from '../../interface/objeto-firebase';

import * as M from 'materialize-css/dist/js/materialize';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  urlDB: string;
  urlForObjectDB: string;
  headers: HttpHeaders;
  button: string;

  constructor(
    private httpClient: HttpClient,
    private stateObjectService: StateObjectService
  ) {
    this.urlDB = `${environment.url}/objects.json`;
    this.urlForObjectDB = `${environment.url}/objects`;
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Esto es un botón para eliminar el mensaje
    this.button =
      `<button class="btn-flat toast-action" onClick=" const toastElement = document.querySelector('.toast');
			       const toastInstance = M.Toast.getInstance(toastElement); toastInstance.dismiss();">
		  <i class="material-icons medium">clear</i>
		  </button>`;
  }

  // Función para crear un objeto
  createObject( objectFirebase: ObjetoFirebase) {
    return this.httpClient.post( this.urlDB, JSON.stringify(objectFirebase),
      {headers: this.headers}
    ).pipe(

      // Si todo salió bien en la función mostrará un mensaje de que se creó nuestro objeto
      map(() => this.showToast('Se creó tu objeto')),

      // Si ocurrió un error , pues mostrará un mensaje de error
      catchError( (error: HttpErrorResponse) => {
        this.showToast('Ocurrió un error en la petición');
        console.error(error);
        return throwError(error);
      })
    );
  }

  // Función para editar un objeto
  putObjeto( objeto: ObjetoFirebase, key$: string ) {
    const body = JSON.stringify(objeto);
    const url = `${this.urlForObjectDB}/${key$}.json`;
    return this.httpClient.put(url, body, { headers: this.headers })
      .pipe(

        // Si todo salió bien en la función mostrará un mensaje de que se modificó nuestro objeto
        map(() => this.showToast('Se editó tu objeto')),

        // Si ocurrió un error , pues mostrará un mensaje de error
        catchError( (error: HttpErrorResponse) => {
          this.showToast('Ocurrió un error en la petición');
          return throwError(error);
        })
      );;
  }

  // Función para obtener un objeto
  getObjeto( key$: string ) {
    const url = `${this.urlForObjectDB}/${key$}.json`;
    return this.httpClient.get(url, {headers: this.headers});
  }

  // Función para obtener la lista de objetos
  getObjects() {
    return this.httpClient.get( this.urlDB, { headers: this.headers }
    ).pipe(
      map( res => {
        this.stateObjectService.setObjectList = res;
        return res;
      }),
      catchError( (error: HttpErrorResponse) => {
        console.error(error);
        this.showToast('Ocurrió un error en la petición');
        return throwError(error);
      })
    );
  }

  // Función para borrar un objeto
  deleteObject(key: string) {
    const url = `${this.urlForObjectDB}/${key}.json`;
    return this.httpClient.delete(url, { headers: this.headers });
  }

  // Función para mostrar un mensaje en la pantalla
  showToast(message: string) {
    M.Toast.dismissAll();
    M.toast({ html: `<span>${message}</span>` + this.button,
      classes: 'grey darken-2 grey-text text-lighten-5',
      displayLength: 2500
    });
  }
}
