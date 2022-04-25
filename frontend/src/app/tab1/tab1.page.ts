import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ITask } from '../interfaces/task';
import { TaskService } from '../services/task.service';

enum viewToDisplay{
  toDoList = "ToDoList",
  addTask = "AddTask"
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  currentView: viewToDisplay;
  tasks!: ITask[];
  currentTask:ITask;
  

  constructor(private taskService:TaskService, private toastController: ToastController) {

    this.currentTask = <ITask>{};
    console.log("Tab 1 task.hasNote" + this.currentTask.hasNote);
    this.currentView = viewToDisplay.toDoList;
    taskService.getTasks().subscribe((results) =>{
       this.tasks = results;
    }, (err) => {
      console.log(err);
    });
    
   }


  createThisTask(formData: any) {

     let thisTask = <ITask> {};
     console.log("formData.description" + formData.description);

         //Post
      thisTask.name = formData.name;
      thisTask.description = formData.description;
      thisTask.date_of_start = formData.date_of_start;
      thisTask.date_of_end = formData.date_of_end;
      thisTask.status = "Not Done";
      thisTask.weekly_task = true;
      thisTask.monthly_goal = false;
      thisTask.hasNote = false;
        
      //console.log(thisTask.completion_date);
      console.log(thisTask);
      this.taskService.createTask(thisTask).subscribe((result)=>{
        console.log("result");
        console.log(result);
        this.showToast();
      });
  }

  addCompletionDate(task:ITask){
    let thisTask = <ITask> {};
    thisTask = task;
  
    thisTask.status = "Done";
    thisTask.completion_date = new Date;
    thisTask.weekly_task = true;
    thisTask.monthly_goal = false;
    thisTask.hasNote = false;


    console.log("thisTask.id," + thisTask.id);
    this.taskService.patchTask(thisTask.id, thisTask).subscribe((result) => {
      // console.log(result);
     
      // //remove from browser view
      
      // let index = this.tasks.findIndex( s=> {
      //   return s.id === thisTask.id;
      // });
      
      // //delete from array
      // this.tasks.splice(index,1);

      // console.log("after delete");


       }, (err) => {
         console.log(err);
       });

   } 

    btnAddTaskClick(){
       this.currentView  = viewToDisplay.addTask;
    }

    btnBackClick(){
      this.currentView  = viewToDisplay.toDoList;
      this.taskService.getTasks().subscribe((results)=> {
        this.tasks = results;
      });
    }
   
  async showToast() {
    const toast = await this.toastController.create({
      message: 'Task added successfully.',
      duration: 3000,
      position: "top",
      buttons: [
        {
          text: "OK",
          handler: () =>{
            console.log("OK Clicked");
          }
        }
      ]
    });
    toast.present();
  }
}



