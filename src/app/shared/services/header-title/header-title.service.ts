import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderTitleService {
  public title = new BehaviorSubject(' Manage - Holidays / Non Operational Days');
  
  constructor() {}
  
  setTitle(title: string) {    
    this.title.next(title);
  }

 
}
