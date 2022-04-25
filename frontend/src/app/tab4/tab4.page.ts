import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ITask } from '../interfaces/task';
import { TaskService } from '../services/task.service';

enum viewToDisplay{
  showNotes = "ShowNotes",
  addNotes = "addNotes"
}

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  currentView: viewToDisplay;
  tasks!:ITask[];
  currentTask:ITask;
  taskComponentCaller:string;
  
  constructor(private taskService:TaskService, private toastController: ToastController) {
    this.currentView = viewToDisplay.showNotes;
    this.taskComponentCaller = "Notes";
    taskService.getTasks().subscribe((results) =>{
      this.tasks = results;
    }, (err) => {
      console.log(err);
    });
   }

   showAddNoteForm(task:ITask){
    this.currentView  = viewToDisplay.addNotes;
    this.currentTask = task;

    console.log("tab4 this.currentTask");
    console.log(this.currentTask);
   }

  addNoteToTask(task:ITask){
      let thisTask = <ITask> {};
     
      thisTask = task;
      thisTask.id = this.currentTask.id;
      thisTask.completion_date = task.completion_date;
      thisTask.weekly_task = true;
      thisTask.monthly_goal = false;
      thisTask.hasNote = true;
      thisTask.noteHeader = task.noteHeader;
      thisTask.noteDetail = task.noteDetail;
      thisTask.noteImportance = task.noteImportance;

      console.log("thisTask.id," + thisTask.id);
      this.taskService.patchTask(thisTask.id, thisTask).subscribe((result) => {
        this.showToast();
      }, (err) => {
        console.log(err);
      });

    } 

    btnBackClick(){
      this.currentView  = viewToDisplay.showNotes;
      this.taskService.getTasks().subscribe((results)=> {
        this.tasks = results;
      });
    }
  
    ionViewWillEnter(){
       this.taskService.getTasks().subscribe((results)=> {
         this.tasks = results;
      
       });
     }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'Note added successfully.',
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
