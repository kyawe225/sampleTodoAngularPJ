import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { Todo } from '../model/todo';
import { ResponseModel } from '../model/response-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [

  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  datasource = signal<Todo[]>([]);
  private modalService = inject(NgbModal);

  constructor(private service: TodoService , private router: Router) { }

  ngOnInit(): void {
    this.getTodoList();
  }

  private getTodoList() {
    let sub = this.service.getAll().subscribe({
      next: (value) => {
        console.log(value);
        let temp = value as ResponseModel<Todo[]>
        this.datasource.set(temp.data);
      },
      error: (error) => {
        console.log(error);
      },
      complete() {
        sub.unsubscribe();
      },
    })
  }

  clickUpdateTodo(id : number){
    this.router.navigateByUrl("/todo/update/"+id);
  }

  clickDeleteTodo(id: number) {
    this.modalService.open(ModalDeleteComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log("closed")
        if (result) {
          this.deleteTodo(id);
          this.getTodoList();
        }
      },
      (reason) => {
        console.log("dismissed")
      },
    );
    // this.deleteTodo(id);
    // this.getTodoList();
  }

  private deleteTodo(id: number) {
    let sub = this.service.delete(id.toString()).subscribe({
      next: (value) => {
        console.log(value)
        this.getTodoList();
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        sub.unsubscribe();
      }
    });
  }
}
