import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/services/models/todo.model';
import { TodoService } from '../../services/todo.service';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as moment_ from 'moment';
const moment = moment_;

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  @Input() todos?: Todo[] = [];
  @Output() todoUpdated = new EventEmitter<Todo>();

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {}

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
        this.todoUpdated.emit(todo);
      }
    });
  }

  isTodoOverdue(todo: Todo) {
    return moment(todo.dueDate).isBefore(moment());
  }
}
