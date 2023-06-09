import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';

interface Genre {
  id: string;
  value: string;
}

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit{

  empMovieForm: FormGroup;

  genres: Genre[] = [
    {id: 'G-1', value: 'Suspense'},
    {id: 'G-2', value: 'Action'},
    {id: 'G-3', value: 'Drama'},
    {id: 'G-4', value: 'Anime'},
    {id: 'G-5', value: 'Thriller'},
    {id: 'G-6', value: 'Romance'},
  ];

  constructor(
    private _fb: FormBuilder, 
    private _empService: MovieService,
    private _dialogRef: MatDialogRef<AddMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBarService: SnackbarService
    ) {
    this.empMovieForm = this._fb.group({
      id: '',
      movie: '',
      image: '',
      duration: '',
      genres: '',
    })
  }

  ngOnInit(): void {
    this.empMovieForm.patchValue(this.data)
  }

  onFormSubmit(){
    if(this.empMovieForm.valid){
      //console.log(this.empMovieForm.value);
      if(this.data){
        this._empService.updateMovie(this.data.id, this.empMovieForm.value).subscribe({
          next: (val: any) => {
              this._snackBarService.openSnackBar('Movie detail updated!', 'Done');
              this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }else {
        this._empService.addMovie(this.empMovieForm.value).subscribe({
          next: (val: any) => {
              this._snackBarService.openSnackBar('Movie added successfully', 'Done');
              this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
    }
  }
}
