import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { Crisis } from './crisis';
import { CrisisService } from './crisis.service';

@Injectable({
  providedIn: 'root'
})
export class CrisisDetailResolverService {

  constructor(
    private crisisCenter: CrisisService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> | Observable<never> {
    const id = route.paramMap.get('id');

    return this.crisisCenter.getCrisis(+id).pipe(
      take(1),
      mergeMap(crisis => {
        if (crisis) {
          return of(crisis);
        } else { // id not found
          this.router.navigate(['/crisis']).then();
          return EMPTY;
        }
      })
    );
  }
}
