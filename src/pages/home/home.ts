import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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
  cashTill:{ 10000: number, 5000: number, 2000: number,1000: number, 500: number, 100: number,50: number, 10: number,5: number,1: number };

  constructor(public navCtrl: NavController, afDB: AngularFireDatabase, private alertCtrl: AlertController) {
    //this.items = afDB.list('cuisines').valueChanges();
    this.invoiceDate = new Date().toISOString();
  }

  checkTotal() {
    this.total = parseFloat(this.todaysSales) + parseFloat(this.startAmount);
  }

  addCashTill() {
    let alert = this.alertCtrl.create({
    title: 'Cash Till',
    inputs: [
      {
        name: '10000',
        placeholder: '10000',
        type: 'number'
      },
      {
        name: '5000',
        placeholder: '5000',
        type: 'number'
      },
      {
        name: '2000',
        placeholder: '2000',
        type: 'number'
      },
      {
        name: '1000',
        placeholder: '1000',
        type: 'number'
      },
      {
        name: '500',
        placeholder: '500',
        type: 'number'
      },
      {
        name: '100',
        placeholder: '100',
        type: 'number'
      },
      {
        name: '50',
        placeholder: '50',
        type: 'number'
      },
      {
        name: '10',
        placeholder: '10',
        type: 'number'
      },
      {
        name: '5',
        placeholder: '5',
        type: 'number'
      },
      {
        name: '1',
        placeholder: '1',
        type: 'number'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.cashTill = {
            10000:parseInt(data['10000']),
            5000:parseInt(data['5000']),
            2000:parseInt(data['2000']),
            1000:parseInt(data['1000']),
            500:parseInt(data['500']),
            100:parseInt(data['100']),
            50:parseInt(data['50']),
            10:parseInt(data['10']),
            5:parseInt(data['5']),
            1:parseInt(data['1'])
          }
          console.log(this.cashTill);
        }
      }
    ]
  });
  alert.present();
}

/*editItem(index:number) {
    let alert = this.alertCtrl.create({
    title: 'Edit member details',
    inputs: [
      {
        name: 'name',
        placeholder: 'Name',
        type: 'text',
        value: this.cashTill.10000
      },
      {
        name: 'members',
        placeholder: 'Number of members',
        type: 'number',
        value:this.userList[index].count
      },
      {
        name: 'expense',
        placeholder: 'Expense',
        type: 'number',
        value:this.userList[index].expense
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Update',
        handler: data => {
          this.userList[index].name = data.name;
          this.userList[index].count = data.members;
          this.userList[index].expense = data.expense;
        }
      }
    ]
  });
  alert.present();
}*/
}
