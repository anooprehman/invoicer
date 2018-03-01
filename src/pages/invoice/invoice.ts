import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'invoice'
})
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {

  item:any;
  invoiceId:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('invoice');
    console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }

}
