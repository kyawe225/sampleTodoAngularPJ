import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoUpdateComponent } from './todo-update/todo-update.component';

export const routes: Routes = [
    {
        path: "todo/list",
        component: TodoListComponent
    },
    {
        path: "todo/create",
        component: TodoCreateComponent
    },
    {
        path: "todo/update/:id",
        component: TodoUpdateComponent
    }
];
