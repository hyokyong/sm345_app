import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import { Message } from '../models/message';
import { Article } from '../models/article';
import { User } from '../models/user';
import { Mentoroom } from '../models/mentoroom';

@Injectable()
export class ServerService {
  
  private URL = 'http://localhost:8085/sm345/api/';

  private http: Http;
  static USERID: number;
  static USERAUTH: number;
  static USERNAME: string;

  constructor(http: Http) { 
    this.http = http;
  }

  makeLogin(user: User): Promise<Message> {
    let url = this.URL + 'login';
    return this.http.post(url, user)
              .toPromise()
              .then(response => 
                response.json() as Message)
              .catch(this.handleError);
  }

  getLoginrecord(user_id: number): Promise<Message> {
    let url = this.URL + 'login_record/' + user_id;
    return this.http.get(url)
              .toPromise()
              .then(response => 
                response.json() as Message)
              .catch(this.handleError);
  }

  updatePassword(user: User): Promise<Message>{
    let url = this.URL + 'updatepassword';
    return this.http.post(url, user)
              .toPromise()
              .then(response => 
                response.json() as Message)
              .catch(this.handleError);
  }

  createMentoroom(mentoroom: Mentoroom): Promise<Message>{
    let url = this.URL + 'mentoroom/create';
    return this.http.post(url, mentoroom)
              .toPromise()
              .then(response => 
                response.json() as Message)
              .catch(this.handleError);
  }

  getMentoroomList(): Promise<Mentoroom[]> {
    let url = this.URL + 'mentoroom'
    return this.http.get(url)
              .toPromise()
              .then(response => response.json() as Mentoroom[])
              .catch(this.handleError);
  }

  getList(board_id: number): Promise<Article[]> {
    let url = this.URL + 'list/' + board_id;
    return this.http.get(url)
              .toPromise()
              .then(response => response.json() as Article[])
              .catch(this.handleError);
  }

  getMentoroom(mentoroom_id: number): Promise<Mentoroom> {
    let url = this.URL + 'mentoroom/' + mentoroom_id;
    return this.http.get(url)
              .toPromise()
              .then(response => response.json() as Mentoroom)
              .catch(this.handleError);
  }

  confirmMentoroom(mentoroom: Mentoroom){
    let url = this.URL + 'mentoroom/' + mentoroom.mentoroom_id + '/confirm';
    return this.http.post(url, mentoroom)
              .toPromise()
              .catch(this.handleError);
  }

  rejectMentoroom(mentoroom_id: number){
    let url = this.URL + 'mentoroom/' + mentoroom_id + '/reject';
    return this.http.get(url)
              .toPromise()
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}