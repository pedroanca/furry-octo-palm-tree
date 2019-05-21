import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css']
})
export class ListDataComponent implements OnInit {
  isDataReady: boolean;
  list: object;
  constructor( private firebaseService: FirebaseService ) {
    this.isDataReady = false;
  }

  ngOnInit() {
    this.getObjets();
  }

  getObjets() {
    this.firebaseService.getObjects()
      .subscribe(
        res => {
          this.list = res;
          return res;
        },
        err => err,
        () => this.isDataReady = true
      );
  }

  removeObject(key: string, index: number) {
    this.firebaseService.deleteObject(key).subscribe(
      res => res,
      err => console.error(err),
      () => {
        delete this.list[key];
        this.firebaseService.showToast('Se borró tu objeto');
      }
    );
  }

}
