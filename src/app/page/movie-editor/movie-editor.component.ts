import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, switchMap } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-editor',
  templateUrl: './movie-editor.component.html',
  styleUrls: ['./movie-editor.component.scss'],
})
export class MovieEditorComponent implements OnInit {

  movie$: Observable<Movie> = this.activatedRoute.params.pipe(
    switchMap((params) =>
     params['id'] != 0 ? this.movieService.get(params['id']) : of(new Movie())
    ),
  );

  movie: Movie = new Movie();

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onUpdate(eventForm: NgForm, movie: Movie): void {
    if (movie.id === 0) {
      this.movieService
        .create(movie)
        .subscribe((movie) => this.router.navigate(['/movie-list']));
    }
    this.movieService
      .update(movie)
      .subscribe((movie) => this.router.navigate(['/movie-list']));
  }

  showToaster(){
    this.toastr.success('Successfully saved!')
    }
}
