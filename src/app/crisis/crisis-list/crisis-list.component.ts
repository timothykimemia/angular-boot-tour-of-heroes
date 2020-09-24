import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  crises: Crisis[];
  crises$: Observable<Crisis[]>;
  selectedId: number;

  constructor(
    private route: ActivatedRoute,
    private crisisService: CrisisService,
  ) { }

  ngOnInit(): void {
    this.getCrises();
  }

  getCrises(): void {
    this.crises$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = +params.get('id');
        return this.crisisService.getCrises();
      })
    );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    console.log(name, {name} as Crisis);
    this.crisisService.addCrisis({ name } as Crisis).subscribe(hero => {
      this.crises.push(hero);
    });
  }

  delete(crisis: Crisis): void {
    this.crises = this.crises.filter(c => c !== crisis);
    this.crisisService.deleteCrisis(crisis).subscribe();
  }

}
