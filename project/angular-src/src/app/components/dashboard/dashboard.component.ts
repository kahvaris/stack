import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { empty } from 'rxjs/Observer';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: String;
  date: Date;
  entry: String;
  showAddEntry: boolean = false;
  subscription: Subscription;
  entries: any[] = [];

  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService, 
    private authService: AuthService,
    private router: Router,
    private uiService: UiService
  ) { 
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showAddEntry = value));
  }

  ngOnInit() {
    this.authService.getDiaryEntries().subscribe(data => {
      this.entries = data['entries'];
      this.entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      console.log(this.entries)
    });
  }

  onClick() {
    this.uiService.toggleAddEntry();
  }

  onSubmit() {
    const diaryEntry = {
      title: this.title,
      date: this.date,
      entry: this.entry,
    }

        // Required fields
        if(!this.validateService.validateEntry(diaryEntry)) {
          this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
          return false;
        }
    
        // Add entry
        this.authService.addDiaryEntry(diaryEntry).subscribe(data => {
          if(data['success']) {
            this.flashMessage.show('Diary entry added successfully', {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/dashboard']);
            console.log('Entry added');
            this.ngOnInit();
          } else {
            this.flashMessage.show('Failed to add diary entry', {cssClass: 'alert-danger', timeout: 3000});
            this.router.navigate(['/dashboard']);
            console.log('Error');
          }
        });
    
    this.title = "";
    this.date = null;
    this.entry = "";

  }

}
