import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../item/api.service';
import { Movie } from '../models/Movie';
import { RouterExtensions } from "@nativescript/angular";
import { Router } from "@angular/router";

@Component({
  selector: 'ns-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
  moduleId: module.id
})

export class MovieFormComponent implements OnInit {
  movie:Movie;
  movieTitle:String;
  
  constructor(  
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private routerextension: RouterExtensions

  ){}  

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    if(id >= 0){
    this.getDetails(id);
    }else{
      this.movie = {title: "", description: ''};
    }
}

getDetails(id: number){

  this.apiService.getMovie(id).subscribe(
      (data:Movie)=>{
          this.movie = data;
          this.movieTitle=this.movie.title;
      },
      err=>console.log(err)
  )
}

editClicked(){
  this.router.navigate(['/edit', this.movie.id])
}

goBack(){
  this.routerextension.backToPreviousPage();
}

saveForm(){

  if(this.movie.id){
    this.apiService.updateMovie(this.movie.id, this.movie.title, this.movie.description).subscribe(
    result=>this.router.navigate(['/items']),
    err=> console.log(err)
  )
  }else{
      this.apiService.createMovie(this.movie.title, this.movie.description).subscribe(
      result=>this.router.navigate(['/items']),
      err=> console.log(err)
      )
   }
 }

 removeMovie(){
    this.apiService.deleteMovie(this.movie.id).subscribe(
      result=>this.router.navigate(['/items']),
      err=> console.log(err)
    )
 }
}
