import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { DialogRef } from '@angular/cdk/dialog';

interface Genre {
  id: string;
  value: string;
}

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent {

  empMovieForm: FormGroup;

  genres: Genre[] = [
    {id: 'G-1', value: 'Suspense'},
    {id: 'G-2', value: 'Action'},
    {id: 'G-3', value: 'Drama'},
  ];

  constructor(
    private _fb: FormBuilder, 
    private _empService: MovieService,
    private _dialogRef: DialogRef<AddMovieComponent>
    ) {
    this.empMovieForm = this._fb.group({
      id: '',
      movie: '',
      duration: '',
      genres: '',
    })
  }

  onFormSubmit(){
    if(this.empMovieForm.valid){
      //console.log(this.empMovieForm.value);
      this._empService.addMovie(this.empMovieForm.value).subscribe({
        next: (val: any) => {
            alert('Movie added successfully');
            this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }
}
