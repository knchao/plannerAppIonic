
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ITask } from 'src/app/interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  @Input() task!:ITask;
  @Input() whoCalledThisComponent:string;
  @Output() markToUpdateEvent = new EventEmitter;

  constructor() {
    console.log("TaskComponent constructor");
   }

  ngOnInit() {
    console.log("whoCalledThisComponent" + this.whoCalledThisComponent);
  }

  checkBoxChecked(){
    this.markToUpdateEvent.emit(this.task);
  }

  btnAddNoteClick(){
    this.markToUpdateEvent.emit(this.task);
  }
}
