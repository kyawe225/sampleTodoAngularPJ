import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { Todo, TodoCreate } from '../model/todo';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ResponseModel } from '../model/response-model';
import { MessageServiceService } from '../service/message-service.service';

@Component({
  selector: 'app-todo-update',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-update.component.html',
  styleUrl: './todo-update.component.scss'
})
export class TodoUpdateComponent implements OnInit {
  public formGroup : FormGroup;
  public id : string;

  public constructor(formBuilder: FormBuilder, private todoService : TodoService,private activatedRoute : ActivatedRoute,private router:Router , private dataService : MessageServiceService ){
    this.formGroup = formBuilder.group({
      task: ['',Validators.required],
      description : ['',Validators.required]
    });
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadTodoDetail()
  }

  private loadTodoDetail(){
    let sub= this.todoService.getDetail(this.id).subscribe({
      next: (value)=>{
        console.log(value)
        let temp = value as ResponseModel<Todo>;
        this.formGroup.controls['task'].setValue(temp.data.task)
        this.formGroup.controls['description'].setValue(temp.data.description)
      },
      error: (error)=>{
        console.log(error);
      },
      complete:()=>{
        sub.unsubscribe();
      }
    });
  }

  submit(){
    if(this.formGroup.valid){
      let model : TodoCreate = {
        task: this.formGroup.controls['task'].value,
        description: this.formGroup.controls['description'].value
      }
      let sub = this.todoService.update(this.id,model).subscribe({
        next : (value)=> {
          console.log(value);
          this.dataService.updateData("Todo Updated Successfully");
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
