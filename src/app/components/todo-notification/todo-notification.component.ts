import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Todo } from 'src/app/services/models/todo.model';

@Component({
  selector: 'app-todo-notification',
  templateUrl: './todo-notification.component.html',
  styleUrls: ['./todo-notification.component.scss']
})
export class TodoNotificationComponent implements OnInit {

  constructor(
    public snackBarRef: MatSnackBarRef<TodoNotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: Todo
  ) { }

  ngOnInit(): void {
  }

}
