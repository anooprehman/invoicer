import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ExpenseModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'expense-modal'
})
@Component({
  selector: 'page-expense-modal',
  templateUrl: 'expense-modal.html',
})
export class ExpenseModalPage {

  types:Array<any>=[];
  type:string="";
  selecttype:string="";
  name:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.types = navParams.get("types");
    this.type = navParams.get("type");
    this.name = navParams.get("name");
    console.log(this.type,this.types,this.name)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss(null);
  }

  setType(){
    console.log(this.selecttype);
    this.type = this.selecttype;
  }

  save() {
    let data = { type: this.type, name:this.name };
    this.viewCtrl.dismiss(data);
  }

}
