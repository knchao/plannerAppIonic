import { Component } from '@angular/core';
import { ITask } from '../interfaces/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  tasks!:ITask[];
  
  
  constructor(private taskService:TaskService) {
    
    taskService.getTasks().subscribe((results) =>{
      this.tasks = results;
    }, (err) => {
      console.log(err);
    });
   }

  
   ionViewWillEnter(){
    this.taskService.getTasks().subscribe((results)=> {
      this.tasks = results;
    
    });
       
   }

}
