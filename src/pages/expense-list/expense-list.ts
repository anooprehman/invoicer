import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ExpenseListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'expense-list'
})
@Component({
  selector: 'page-expense-list',
  templateUrl: 'expense-list.html',
})
export class ExpenseListPage {
  expenses: Observable<any[]>;
  expensesRef: AngularFireList<any>;
  expenseList:Array<any>;
  loadedexpenseList:Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, afDB: AngularFireDatabase, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.expenses = afDB.list('expenseTypes').valueChanges();
    this.expensesRef = afDB.list('expenseTypes');

    this.expenses.subscribe(items => {
      this.expenseList = items;
      this.loadedexpenseList = items;
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseListPage');
  }

  initializeList() {
    this.expenseList = this.loadedexpenseList;
  }

  addExpense(){
    let prompt = this.alertCtrl.create({
      title: 'Expense Type',
      inputs: [
        {
          name: 'type',
          placeholder: 'Type'
        },
        {
          name: 'name',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            const newExpenseRef = this.expensesRef.push({});
   
            newExpenseRef.set({
              id: newExpenseRef.key,
              type: data.type,
              name: data.name,
            });
          }
        }
      ]
    });
    prompt.present();
  }

  removeExpense(key: string){
    this.expensesRef.remove(key);
  }

  updateExpense(key, type, name){
    let expenseTypes = this.unique(this.loadedexpenseList,'type');
    console.log(expenseTypes);
    let modal = this.modalCtrl.create("expense-modal",{type:type,name:name, types:expenseTypes},{enableBackdropDismiss:false});
    modal.onDidDismiss(data => {
      if(data) {
        console.log(data);
        this.expensesRef.update(key, {
          type: data.type,
          name: data.name
        });
      }
    });
    modal.present();

    /*let prompt = this.alertCtrl.create({
      title: 'Expense Type',
      inputs: [
        {
          name: 'type',
          placeholder: 'Type',
          value: type
        },
        {
          name: 'name',
          placeholder: 'Name',
          value: name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.expensesRef.update(key, {
              type: data.type,
              name: data.name
            });
          }
        }
      ]
    });
    prompt.present();*/
  }

  unique(arr, prop){
    return arr.map(function(e) { return e[prop]; }).filter(function(e,i,a){
      return i === a.indexOf(e);
    });
  }

  getExpenses(ev: any) {
    // Reset items back to all of the items
    this.initializeList();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.expenseList = this.expenseList.filter((item) => {
        return (item.type.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
