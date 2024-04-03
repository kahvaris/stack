import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  entries: any[] = [];
  entriesCount: number;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = (profile as any).user;
    },
    err => {
      console.log(err);
      return false;
    });
    this.authService.getDiaryEntries().subscribe(data => {
      this.entries = data['entries'];
      this.entriesCount = this.entries.length;
      console.log(this.entriesCount);
    });
  }


}
