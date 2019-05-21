import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {FirebaseService} from '../../services/firebase/firebase.service';

import * as M from 'materialize-css/dist/js/materialize';
import {ObjetoFirebase} from '../../interface/objeto-firebase';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-new-object',
  templateUrl: './new-object.component.html',
  styleUrls: ['./new-object.component.css']
})
export class NewObjectComponent implements OnInit, AfterViewInit {
  @ViewChild('select') selectElement: ElementRef;
  objetoFirebase: ObjetoFirebase;
  categories: string[];
  MFormSelect: M.FormSelect;
  bandera: boolean;
  idObjeto: string;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.objetoFirebase = {consider: false, category: 0, characteristics: '', name: ''};
    this.categories = ['Sin Importancia', 'Normal', 'Importante'];
    this.bandera = false;
    this.activatedRoute.params.subscribe(res => this.idObjeto = res.id);
  }

  ngOnInit() {
    if ( this.idObjeto !== 'nuevo' ) {
      this.getObjeto();
    }
  }

  ngAfterViewInit(): void {
    this.MFormSelect = new M.FormSelect(this.selectElement.nativeElement, {});
  }

  saveObject(ngForm: NgForm) {
    if ( this.idObjeto === 'nuevo') {
      this.firebaseService.createObject(ngForm.form.value).subscribe(
        res => res,
        err => err,
        () => {
          ngForm.reset();
          return this.router.navigate(['/objetos']);
        }
        );
    } else {
      this.firebaseService.putObjeto(ngForm.form.value, this.idObjeto).subscribe(
        res => console.log(res),
        err => console.error(err),
        () => this.router.navigate(['/objetos'])
      );
    }
  }

  getObjeto() {
    this.firebaseService.getObjeto(this.idObjeto)
      .subscribe(
        (res: ObjetoFirebase) => this.objetoFirebase = res,
        err => console.error(err),
        () => { }
      );
  }
}
