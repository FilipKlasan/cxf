import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-payment-slip',
  templateUrl: './payment-slip.component.html',
  styleUrls: ['./payment-slip.component.css']
})
export class PaymentSlipComponent implements OnInit {

  niz = [];

  constructor(private data: DataService, private language: LanguageService) { 
    this.niz = [
      { sr: data.podaci.sr0, en: data.podaci.en0 },
      { sr: data.podaci.sr1, en: data.podaci.en1 },
      { sr: data.podaci.sr2, en: data.podaci.en2 },
      { sr: data.podaci.sr3, en: data.podaci.en3 },
      { sr: data.podaci.sr4, en: data.podaci.en4 },
      { sr: data.podaci.sr5, en: data.podaci.en5 },
      { sr: data.podaci.sr6, en: data.podaci.en6 },
      { sr: data.podaci.sr7, en: data.podaci.en7 }
    ]
  }

  ngOnInit() {

  }

}