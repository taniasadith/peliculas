import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { MovieService } from '../../services/movie.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private _dialog: MatDialog, private _empService: MovieService){}

  ngOnInit(): void {
    this.getMovieList();
  }
  
  openAddMovieForm(){
    this._dialog.open(AddMovieComponent)
  }

  getMovieList(){
    this._empService.getMovieList().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: console.log,
    })
  } 
  
}
