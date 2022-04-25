import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from 'src/app/interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private httpClient: HttpClient) { }

    getTasks(){
      return this.httpClient.get<ITask[]>('http://localhost:3000/tasks');
    }
  
    createTask(Data:any){
      console.log(" createTask(Data:any){");
      console.log(Data);
      return this.httpClient.post('http://localhost:3000/tasks', Data);
    }

    patchTask(taskId:number, Data: any) {
      return this.httpClient.patch(`http://localhost:3000/tasks/${taskId}`, Data);
    }

    deleteTask(taskId:number){
      console.log("delete called");
      return this.httpClient.delete(`http://localhost:3000/tasks/${taskId}`);
     
    }

}
