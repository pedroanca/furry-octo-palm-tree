import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateObjectService {
  objectList: object;
  constructor() { }

  set setObjectList(data: object) {
    this.objectList = data;
  }

  get getObjectList(): object {
    return  this.objectList;
  }
}
