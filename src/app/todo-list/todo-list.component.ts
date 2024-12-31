import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { Todo } from '../model/todo';
import { ResponseModel } from '../model/response-model';
import { NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { Router } from '@angular/router';
import { MessageServiceService } from '../service/message-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  imports: [
    NgbAlertModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit,OnDestroy {

  datasource = signal<Todo[]>([]);
  private modalService = inject(NgbModal);
  receivedData =signal<string>("");
  private sub: Subscription|null = null;

  constructor(private service: TodoService , private router: Router , private dataService : MessageServiceService) { }

  ngOnInit(): void {
    this.getTodoList();

    this.sub = this.dataService.currentData.subscribe((data) => {
     this.showAlert(data)
    });
  }

  private showAlert(data : string){
    this.receivedData.set(data); // Access the shared data
    console.log('Received Data:', this.receivedData);
    setTimeout(()=>{
      this.receivedData.set("");
    },1000)
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
        this.showAlert("Delete Successfully");
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        sub.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
