import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { TaskComponent } from '../components/task/task.component';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  declarations: [Tab1Page, TaskComponent, AddTaskComponent]
})
export class Tab1PageModule {}
