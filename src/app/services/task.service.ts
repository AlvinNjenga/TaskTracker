import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    const tasks = this.http.get<Task[]>(this.apiUrl)
    return tasks;
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${task.id}`)
  }

  updateTaskReminder(task: Task): Observable<Task> {
    return this.http.put<Task>(this.apiUrl + `/${task.id}`, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
