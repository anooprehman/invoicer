import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ItemExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'item-expense'
})
@Component({
  selector: 'page-item-expense',
  templateUrl: 'item-expense.html',
})
export class ItemExpensePage {

  types:Array<any>=[];
  selecttype:string="";
  price:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.types = navParams.get("types");
    console.log(this.types)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemExpensePage');
  }

  dismiss() {
    this.viewCtrl.dismiss(null);
  }


  save() {
    let data = { type: this.selecttype, price:this.price };
    this.viewCtrl.dismiss(data);
  }

}
