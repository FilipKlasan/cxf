import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material';
import { ValidInvalidComponent } from '../../components/valid-invalid/valid-invalid.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  languages = ['SR', 'EN'];
  h = [];
  n = [];
  arr = [];
  name: string = '';
  phoneNumber: string = '';
  email: string = '';
  comment: string = '';
  namePattern = '^[a-zA-Z]+$';
  phonePattern = '^[0-9 -+]+$';
  
  constructor(private language: LanguageService, 
              private data: DataService,
              private dialog: MatDialog,
              private router: Router) {
     let temp = [];
     let br = 1;
     for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 4; j++) {
          temp.push('fx'+br);
          br++;
      }
      this.arr.push(temp);
      temp = [];
     }
     window.onload = function() {
       localStorage.removeItem('Validation');
     };
  }

  validInvalid(tSr, tEn, color, infoSr, infoEn) {
    this.dialog.open(ValidInvalidComponent, {
      width: '300px',
      height: 'auto',
      data: { 
          viSr: tSr,
          viEn: tEn,
          backgroundColor: color,
          informationSr: infoSr,
          informationEn: infoEn
      }
    });
  }

  brojevi() {
    let f = 0;
    for(let i = 0; i <= this.h[0].c; i++) {
        if(i < 100) {
           f += 30; 
        }
        else if(i < 120) {
           f += 60;
        }
        else {
           f += 90;
        }
        setTimeout(() => { this.h[0].azc = i }, f);
    }
    let r = 0;
    for(let i = 0; i <= this.h[1].c; i++) {
        if(i < 70) {
           r += 30; 
        }
        else if(i < 100) {
           r += 60;
        }
        else {
           r += 90;
        }
        setTimeout(() => { this.h[1].azc = i }, r);
    }
    let q = 0;
    for(let i = 0; i <= this.h[2].c; i++) {
        q += 200;
        setTimeout(() => { this.h[2].azc = i }, q);
  }
  setTimeout(() => { this.brojevi() }, 8000);
  }

  pay() {
    this.router.navigate(['/form']);
  }
  
  cekiranje(el) {
    let r = 0;
    for(let i = 0; i <= el.cena; i++) {
        r += 10;
        setTimeout(() => { el.counter = i }, r);
    }
    if(el.cekiran) {
       this.data.remove(el);
       el.cekiran = false;
    }
    else {
       this.data.add(el);
       el.cekiran = true;
    }
  }

  send(phoneInv) {
    let ph = this.phoneNumber.replace(' ', '');
    let e = this.email.replace(' ', '');
    if(ph == '' || phoneInv) {
       this.validInvalid('Neispravno', 'Invalid', 'rgb(244, 67, 54)', 'Polja za unos moraju biti ispravna!', 'Input fields must be valid!');
    }
    else {
      let obj = {
        hf: 'f',
        name: this.name,
        phoneNumber: this.phoneNumber,
        email: this.email,
        comment: this.comment
      }
      this.data.sendEmail(obj).subscribe(res => {
        this.validInvalid('Uspeh', 'Success', 'rgb(63, 81, 181)', 'Poruka je poslata!', 'The message has been sent!');
        this.name = '';
        this.phoneNumber = '';
        this.email = '';
        this.comment = '';
      },
      err => {
        this.validInvalid('Greška', 'Error occurred', 'rgb(244, 67, 54)', 'Došlo je do greške', 'An error has occurred');
      });
    }
  }

  ngOnInit() {
    this.data.getAllData().subscribe(res => {
      this.h = res.statusObj.h;
      if(this.data.elements.length == 0) {
         this.data.elements = res.statusObj.n;
      }
      this.data.podaci = res.statusObj.podaci;
      this.brojevi();
    },
    err => {
      this.validInvalid('Greška', 'Error occurred', 'rgb(244, 67, 54)', 'Došlo je do greške', 'An error has occurred');
    });
    let obj = { r: 'fzx' };
    if(!localStorage.getItem('f')) {
       localStorage.setItem('f', 'x');
       this.data.counter(obj).subscribe(res => {

       },
       err => {
        
       });
    }
  }

}