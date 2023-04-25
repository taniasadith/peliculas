import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _http: HttpClient) {}

  addMovie(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/movie',data);
  }

  getMovieList(): Observable<any>{
    return this._http.get('http://localhost:3000/movie');
  }
}