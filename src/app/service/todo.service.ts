import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { TodoCreate } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = environment.base_url;

  baseUri = "todo"

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.baseUrl + this.baseUri);
  }

  getDetail(id: string) {
    return this.httpClient.get(this.baseUrl + this.baseUri + "/"+ id);
  }

  create(model: TodoCreate) {
    return this.httpClient.post(this.baseUrl + this.baseUri, model);
  }

  update(id: string, model: TodoCreate) {
    return this.httpClient.put(this.baseUrl + this.baseUri + "/" + id, model)
  }

  delete(id: string) {
    return this.httpClient.delete(this.baseUrl + this.baseUri + "/" + id)
  }

}
