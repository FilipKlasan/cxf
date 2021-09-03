import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invalid-link',
  templateUrl: './invalid-link.component.html',
  styleUrls: ['./invalid-link.component.css']
})
export class InvalidLinkComponent implements OnInit {

  constructor(private router: Router) { }

  nav() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}