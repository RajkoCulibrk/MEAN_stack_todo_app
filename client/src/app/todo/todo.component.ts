import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TodoProviderService } from '../todo-provider.service';
import {
  faTrash,
  faPenAlt,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input()
  todo;
  group: FormGroup;
  editing: boolean = false;
  faTrash = faTrash;
  faPenAlt = faPenAlt;
  faWindowClose = faWindowClose;

  constructor(
    private fb: FormBuilder,
    private todoProvider: TodoProviderService
  ) {}

  ngOnInit(): void {
    this.group = this.fb.group({
      text: new FormControl({ value: this.todo.text, disabled: false }),
      completed: new FormControl({
        value: this.todo.completed,
        disabled: false,
      }),
      important: new FormControl({
        value: this.todo.important,
        disabled: false,
      }),
    });
  }

  setEditing() {
    if (this.editing) {
      this.group.patchValue(this.todo);
    }
    this.editing = !this.editing;
    console.log(this.editing);
  }

  deleteTodo() {
    this.todoProvider.deleteTodo(this.todo._id);
  }

  updateTodo() {
    this.todoProvider.updateTodo(this.todo._id, this.group.value);
  }
}
