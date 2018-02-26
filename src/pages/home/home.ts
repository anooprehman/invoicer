import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: Observable<any[]>;
  printTaken:boolean = true;
  invoiceDate:string;
  todaysSales:any = 0;
  startAmount:any = 0;
  total:number = 0;

  constructor(public navCtrl: NavController, afDB: AngularFireDatabase) {
    //this.items = afDB.list('cuisines').valueChanges();
    this.invoiceDate = new Date().toISOString();
  }

  checkTotal() {
    this.total = parseFloat(this.todaysSales) + parseFloat(this.startAmount);
  }
}
