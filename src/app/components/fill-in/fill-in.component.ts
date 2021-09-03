import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ValidInvalidComponent } from '../../components/valid-invalid/valid-invalid.component';
import { MatDialog } from '@angular/material';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fill-in',
  templateUrl: './fill-in.component.html',
  styleUrls: ['./fill-in.component.css']
})
export class FillInComponent {

  namePattern = '^[a-zA-Z]+$';
  phonePattern = '^[0-9 -+]+$';
  disabled: boolean = false;

  constructor(private language: LanguageService,
              private dialog: MatDialog,
              private data: DataService,
              private router: Router) {
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

  send(phInv) {
    if(!this.disabled) {
      let name = this.data.name.replace(' ', '');
      let ph = this.data.phoneNumber.replace(' ', '');
      if(ph == '' || phInv) {
         this.validInvalid('Neispravno', 'Invalid', 'rgb(244, 67, 54)', 'Polja za unos moraju biti ispravna!', 'Input fields must be valid!');
      }
      else {
        let packages = ''; 
        for(let i = 0; i < this.data.elements.length; i++) {
            if(this.data.elements[i].cekiran) {
               packages += this.data.elements[i].paket + " " + this.data.elements[i].cena.toFixed(2) + " € / ";
            }
        }
        let obj = {
          hf: 'h',
          name: this.data.name,
          phoneNumber: this.data.phoneNumber,
          email: this.data.email,
          total: this.data.total.toFixed(2),
          packages: packages,
        }
        this.data.sendEmail(obj).subscribe(res => {
          localStorage.setItem('Validation', 'fzx');
          this.router.navigate(['/payment-slip']);
        },
        err => {
          this.disabled = false;
          this.validInvalid('Greška', 'Error occurred', 'rgb(244, 67, 54)', 'Došlo je do greške', 'An error has occurred');
        });
        this.disabled = true;
      }
    }
  }

  back() {
    this.router.navigate(['/']);
  }

}