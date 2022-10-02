import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Article } from './articles/article';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any) {

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body'
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  getArticles() {
    return this.request('GET', `${environment.serverUrl}/read.php`);
  }

  getHistoriques() {
    return this.request('GET', `${environment.serverUrl}/read_historique.php`);
  }

  createArticle(article:any) {
    return this.request('POST', `${environment.serverUrl}/create.php`, article);
  }

  updateArticle(article:any) {
    return this.request('PUT', `${environment.serverUrl}/update.php/`, article);
  }

  deleteArticle(article:any) {
    return this.request('DELETE', `${environment.serverUrl}/delete.php/`, article);
  }
}