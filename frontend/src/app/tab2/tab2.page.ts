import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ITask } from '../interfaces/task';
import { TaskService } from '../services/task.service';

enum viewToDisplay{
  task_Goals = "Task_Goals",
  addTask_Goal = "AddTask_Goal"
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  currentView:viewToDisplay;
  task_Goals!:ITask[];
  currentTaskGoal:ITask;
  

  constructor(private taskService:TaskService, private toastController: ToastController) {
    console.log("Tab2 constructor");
    this.currentTaskGoal = <ITask>{};
    this.currentView = viewToDisplay.task_Goals;
    taskService.getTasks().subscribe((results) =>{
      this.task_Goals = results;
      console.log(results);
    }, (err) => {
      console.log(err);
    });
   }

   createThisTaskGoal(formData: any) {

    let thisTask = <ITask> {};
    console.log("formData.description" + formData.description);

        //Post
     thisTask.name = formData.name;
     thisTask.description = formData.description;
     thisTask.date_of_start = formData.date_of_start;
     thisTask.date_of_end = formData.date_of_end;
     thisTask.status = "Not Done";
     thisTask.weekly_task = false;
     thisTask.monthly_goal = true;
     thisTask.hasNote = false;
          
     //console.log(thisTask.completion_date);
     console.log(thisTask);
     this.taskService.createTask(thisTask).subscribe((result)=>{
      this.showToast();
       console.log(result);
     });
 }


 addCompletionDate(task:ITask){
  let thisTask = <ITask> {};
  thisTask = task;

  thisTask.status = "Done";
  thisTask.completion_date = new Date;
  thisTask.weekly_task = false;
  thisTask.monthly_goal = true;
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

    btnAddGoalClick(){
      this.currentView  = viewToDisplay.addTask_Goal;
    }

    btnBackClick(){
      this.currentView  = viewToDisplay.task_Goals;
      this.taskService.getTasks().subscribe((results)=> {
        this.task_Goals = results;
      });
     
    }
    async showToast() {
      const toast = await this.toastController.create({
        message: 'Goal added successfully.',
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
