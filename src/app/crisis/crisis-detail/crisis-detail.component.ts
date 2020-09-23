import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis: Crisis;
  crisis$: Observable<Crisis>;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private crisisService: CrisisService,
  ) { }

  ngOnInit(): void {
    this.getCrisis();
  }

  getCrisis(): void {
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.crisisService.getCrisis(+params.get('id'))
      )
    );
  }

  save(): void {
    this.crisisService.updateCrisis(this.crisis).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  goToCrises(crisis: Crisis): void {
    const crisisId = crisis ? crisis.id : null;
    this.router.navigate(['../', { id: crisisId }], { relativeTo: this.route }).then();
  }

}
