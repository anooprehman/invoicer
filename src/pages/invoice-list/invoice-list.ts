import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the InvoiceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'invoice-list'
})
@Component({
  selector: 'page-invoice-list',
  templateUrl: 'invoice-list.html',
})
export class InvoiceListPage {

  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, afDB: AngularFireDatabase) {
    this.items = afDB.list('invoices').valueChanges();
    this.itemsRef = afDB.list('invoices');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceListPage');
  }

}
