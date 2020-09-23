import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Crisis } from './crisis';

import { MessageService } from '../messages/message.service';
import {Hero} from '../heroes/hero';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {
  private crisisUrl = 'api/crises'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  /** GET crises from the server */
  getCrises(): Observable<Crisis[]> {
    return this.http.get<Crisis[]>(this.crisisUrl).pipe(
      tap(_ => this.log('fetched crises')),
      catchError(this.handleError<Crisis[]>('getCrises', []))
    );
  }

  /** GET crisis by id. Will return 404 if id not found */
  getCrisis(id: number): Observable<Crisis> {
    const url = `${this.crisisUrl}/${id}`;
    return this.http.get<Crisis>(url).pipe(
      tap(_ => this.log(`fetched crisis id=${id}`)),
      catchError(this.handleError<Crisis>(`getCrisis id=${id}`))
    );
  }

  /** POST: add a new crisis to the server */
  addCrisis(crisis: Crisis): Observable<any> {
    return this.http.post<Crisis>(this.crisisUrl, crisis, this.httpOptions).pipe(
      tap((newCrisis: Crisis) => this.log(`added crisis w/ id=${newCrisis.id}`)),
      catchError(this.handleError<Crisis>('addCrisis'))
    );
  }

  /** PUT: update the crises on the server */
  updateCrisis(crisis: Crisis): Observable<any> {
    return this.http.put(this.crisisUrl, crisis, this.httpOptions).pipe(
      tap(_ => this.log(`updated crisis id=${crisis.id}`)),
      catchError(this.handleError<any>('updateCrisis'))
    );
  }

  /** DELETE: delete the crisis from the server */
  deleteCrisis(crisis: Crisis | number): Observable<Crisis> {
    const id = typeof crisis === 'number' ? crisis : crisis.id;
    const url = `${this.crisisUrl}/${id}`;

    return this.http.delete<Crisis>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted crisis id=${id}`)),
      catchError(this.handleError<Crisis>('deleteCrisis'))
    );
  }

  /** GET crises whose name contains search term */
  searchCrises(term: string): Observable<Crisis[]> {
    if (!term.trim()) {
      // if not a search term, return empty crises array
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.crisisUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** GET crisis by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.crisisUrl}/?id=${id}`;
    return this.http.get<Crisis[]>(url).pipe(
      map(crises => crises[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} crisis id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getCrisis id=${id}`))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string): any {
    this.messageService.add(`CrisisService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
