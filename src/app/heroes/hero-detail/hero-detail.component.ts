import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  hero$: Observable<Hero>;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private heroService: HeroService,
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.hero$ = this.route.paramMap.pipe(    // <-- switchMap (observable alternative | using async)
      switchMap((params: ParamMap) =>
        this.heroService.getHero(+params.get('id')))    // <-- (+) before `params.get()` turns the string into a number
    );

    /*const id = +this.route.snapshot.paramMap.get('id');     // <-- snapshot (no-observable alternative)
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);*/
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  goToHeroes(hero: Hero): void {
    // this.router.navigate(['/hero']);   // <-- simply just navigate back to /hero

    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/hero', { id: heroId}]).then();    // <-- alternatively if you want to return back with ID of hero attached
  }

}
