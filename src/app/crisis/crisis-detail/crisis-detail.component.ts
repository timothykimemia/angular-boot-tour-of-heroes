import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

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
  editName: string;

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

    /*this.route.data
      .subscribe((data: { crisis: Crisis }) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      });*/
  }

  save(crisis: Crisis): void {
    this.crisisService.updateCrisis(crisis).subscribe(() => this.goToCrises(crisis));
  }

  cancel(): void {
    this.goToCrises(null);
  }

  goBack(): void {
    this.location.back();
  }

  goToCrises(crisis: Crisis | null): void {
    const crisisId = crisis ? crisis.id : null;
    // Pass along the crisis id if available
    // so that the CrisisListComponent can select that crisis.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: crisisId }], { relativeTo: this.route }).then();
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.crisisService.confirm('Discard changes?');
  }

}
