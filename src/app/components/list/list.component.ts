import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ObjetoFirebase} from '../../interface/objeto-firebase';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild('collapsible') collapsibleElement: ElementRef;
  @Input() isDataReady: boolean;
  @Input() isAMock: boolean;
  @Input() object: ObjetoFirebase;
  @Input() key: string;
  @Output() deleteByKey: EventEmitter<string>;

  constructor( ) {
    this.isAMock = false;
    this.deleteByKey = new EventEmitter();
  }

  ngOnInit() { }

  ngAfterViewInit() {}

  deleteObject(event: Event, key: string) {
    event.stopPropagation();
    this.deleteByKey.emit(key);
  }
}
