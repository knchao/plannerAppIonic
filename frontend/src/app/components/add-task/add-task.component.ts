import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  @Input() task!:ITask;
 
  @Output() postEvent = new EventEmitter;

  form;
  
  constructor(private taskService: TaskService) { 

      console.log("AddTask component called");

      this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date_of_start: new FormControl('', [Validators.required]),
      date_of_end: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      noteHeader: new FormControl(''),
      noteDetail: new FormControl(''),
      noteImportance: new FormControl(''),
    });

    
  }

  get name(){
    return this.form.get('name');
  }

  get description(){
    return this.form.get('description');
  }

  get date_of_start(){
    return this.form.get('date_of_start');
  }
  get date_of_end(){
    return this.form.get('date_of_end');
  }
  get status(){
    return this.form.get('status');
  }
  
 onSubmit(){
    console.log("this.form.value.description" + this.form.value.description );
   
    this.postEvent.emit(this.form.value);
    this.form.reset();
   
  }

  ngOnInit() {
    console.log("ngOnInit" + this.task.name);
    this.form.patchValue({
           name: this.task.name,
           description: this.task.description,
           date_of_start: this.task.date_of_start,
           date_of_end: this.task.date_of_end,
           status: this.task.status,
           noteHeader: this.task.noteHeader,
           noteDetail: this.task.noteDetail,
           noteImportance: this.task.noteImportance
    });
  }

}