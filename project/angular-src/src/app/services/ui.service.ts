import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UiService {
  private showAddEntry: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleAddEntry(): void {
    this.showAddEntry = !this.showAddEntry;
    this.subject.next(this.showAddEntry);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

}
