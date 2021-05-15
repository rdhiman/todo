import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../services/models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment_ from 'moment';
import { TodoNotificationComponent } from '../todo-notification/todo-notification.component';
const moment = moment_;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todo?: Todo;
  todos?: Todo[] = [];
  todosOverdue?: Todo[] = [];
  todosCurrent?: Todo[] = [];
  todosComplete?: Todo[] = [];
  renderComponent = false;
  durationInSeconds = 3;

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().pipe(
      take(1),
      catchError((err) => {
        return throwError({
          methodName: 'todo.service.getTodos',
          message: err
        });
      })
    ).subscribe((result: Todo[]) => {
      this.todos = result;
      this.formatTodos(this.todos);
    });
  }

  formatTodos(todos: Todo[]) {
    todos.map((todo) => {
      if (todo.dueDate) todo.dueDate = moment(todo.dueDate).format('MM/DD/YYYY');
      todo.isComplete ? this.todosComplete?.push(todo) : 
        moment(todo.dueDate).isBefore(moment()) ? this.todosOverdue?.push(todo) :
          this.todosCurrent?.push(todo);
    });
    this.todosOverdue?.sort((a, b) => moment(b.dueDate).isBefore(a.dueDate) ? 1 : -1);
    this.todosCurrent?.sort((a, b) => moment(b.dueDate).isBefore(a.dueDate) ? 1 : -1);
    this.renderComponent = true;
  }

  todoUpdated(event: Todo) {
    this.todos?.map((item) => {
      if (item.id === event.id) {
        this.openSnackBar(event);
        item.isComplete = !item.isComplete;
      }
    });
    this.todosOverdue = [];
    this.todosCurrent = [];
    this.todosComplete = [];
    this.formatTodos(this.todos || []);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).pipe(
      take(1),
      catchError((err) => {
        return throwError({
          methodName: 'todo.service.getTodos',
          message: err
        });
      })
    ).subscribe((result) => {
      if (result.status === 'success') {
        this.todos?.map((item) => {
          if (item.id === todo.id) {
            this.openSnackBar(todo);
            item.isComplete = !item.isComplete;
          }
        });
        this.todosOverdue = [];
        this.todosCurrent = [];
        this.todosComplete = [];
        this.formatTodos(this.todos || []);
      }
    });
  }

  openSnackBar(todo: Todo) {
    this.snackBar.openFromComponent(TodoNotificationComponent, {
      data: todo,
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

}
