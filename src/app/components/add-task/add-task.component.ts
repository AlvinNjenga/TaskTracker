import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter<Task>();
  text: string;
  day: string;
  reminder: boolean = false;
  subscription: Subscription;
  showAddTask: boolean = false;

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService
      .onToggle()
      .subscribe(value => this.showAddTask = value);
  }

  ngOnInit(): void { }


  onSubmit() {
    if (!this.text) {
      alert('Please add a task')
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask);

    this.text = "";
    this.day = "";
    this.reminder = false;
  }
}