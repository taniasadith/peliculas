import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { MovieService } from '../../services/movie.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  displayedColumns: string[] = ['id', 'movie', 'duration', 'genres','action'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _dialog: MatDialog, 
              private _empService: MovieService,
              private _snackBarService: SnackbarService){}

  ngOnInit(): void {
    this.getMovieList();
  }
  
  openAddMovieForm(){
    const dialogRef = this._dialog.open(AddMovieComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if (val){
          this.getMovieList();
        }
      }
    })
  }

  getMovieList(){
    this._empService.getMovieList().subscribe({
      next: (res) => {
        //console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  } 

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  deleteMovie(id: number){
    this._empService.deleteMovie(id).subscribe({
      next: (res) => {
        this._snackBarService.openSnackBar('Movie deleted successfully', 'Done');
        this.getMovieList();
      },
      error: console.log,
    })
  }
  
  openEditForm(data:any){
    const dialogRef = this._dialog.open(AddMovieComponent,{
      data: data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if (val){
          this.getMovieList();
        }
      }
    })
  }
}
