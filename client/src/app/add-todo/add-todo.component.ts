import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoProviderService } from '../todo-provider.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private todoProvider: TodoProviderService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      text: '',
      important: { value: false, disabled: false },
    });
  }

  addTodo() {
    this.todoProvider.addTodo(this.form.value);
    this.form.reset();
  }
}
