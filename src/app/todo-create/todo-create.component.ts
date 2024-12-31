import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { TodoCreate } from '../model/todo';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  imports: [
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss'
})
export class TodoCreateComponent {

  

  public formGroup : FormGroup;

  public constructor(formBuilder: FormBuilder , private todoService : TodoService, private router: Router){
    this.formGroup = formBuilder.group({
      task: ['',Validators.required],
      description : ['',Validators.required]
    });
  }
  submit(){
    if(this.formGroup.valid){
      let model : TodoCreate = {
        task: this.formGroup.controls['task'].value,
        description: this.formGroup.controls['description'].value
      }
      let sub = this.todoService.create(model).subscribe({
        next : (value)=> {
          console.log(value);
        },
        error: (error)=>{
          console.log(error);
        },
        complete:()=>{
          sub.unsubscribe();
          this.router.navigateByUrl("/todo/list");
        }
      })
    }
    
  }
}
