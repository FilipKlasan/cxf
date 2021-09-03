import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'valid-invalid',
  templateUrl: './valid-invalid.component.html',
  styleUrls: ['./valid-invalid.component.css']
})
export class ValidInvalidComponent {
  
  constructor(private languageService: LanguageService,
              public dialogRef: MatDialogRef<ValidInvalidComponent>,
              @Inject(MAT_DIALOG_DATA) public info) {}
  
}