import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, afDB: AngularFireDatabase,public alertCtrl: AlertController) {
    this.itemsRef = afDB.list('invoices');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceListPage');
  }

  getDetails(item) {
    this.navCtrl.push('invoice',{invoice: item}, { animate: true, direction: 'forward' })
  }

  deleteItem(key: string) {
    let confirm = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.itemsRef.remove(key);
          }
        }
      ]
    });
    confirm.present();
  }

}
