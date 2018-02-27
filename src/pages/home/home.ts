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
  printTaken:boolean = false;
  ZPrintTaken:boolean = false;
  regClosed:boolean = false;
  invoiceDate:string;
  todaysSales:any = 0;
  startAmount:any = 0;
  total:any = 0;
  extraCash:any = 0;
  totalCashTill:any = 0;
  expenses:any = 0;
  totalExpenses:any = 0;
  creditCardPayments:any = 0;
  mistakeAmount:any = 0;
  ownerAmount:any = 0;
  cashOwner:string = "";
  mistake:string = "+";
  cashTill:{ 10000: number, 5000: number, 2000: number,1000: number, 500: number, 100: number,50: number, 10: number,5: number,1: number };

  constructor(public navCtrl: NavController, afDB: AngularFireDatabase, private alertCtrl: AlertController) {
    //this.items = afDB.list('cuisines').valueChanges();
    this.invoiceDate = new Date().toISOString();
  }

  checkTotal() {
    this.total = parseFloat(this.todaysSales) + parseFloat(this.startAmount);
  }

  calculateTotalCashTill() {
    this.totalCashTill = 10000*this.cashTill['10000'] +
    5000*this.cashTill['5000'] +
    2000*this.cashTill['2000'] +
    1000*this.cashTill['1000'] +
    500*this.cashTill['500'] +
    100*this.cashTill['100'] +
    50*this.cashTill['50'] +
    10*this.cashTill['10'] +
    5*this.cashTill['5'] +
    1*this.cashTill['1'] +
    parseFloat(this.extraCash);
  }

  checkAllExpenses() {
    this.totalExpenses = parseFloat(this.totalCashTill) + parseFloat(this.expenses) + parseFloat(this.creditCardPayments) + parseFloat(this.ownerAmount);
    if(this.mistake == "-")
      this.totalExpenses = parseFloat(this.totalExpenses) - parseFloat(this.mistakeAmount);
    else
      this.totalExpenses = this.totalExpenses + parseFloat(this.mistakeAmount);
    console.log(this.totalExpenses);
  }

  addCashTill() {
    let alert = this.alertCtrl.create({
    title: 'Cash Till',
    inputs: [
      {
        name: '10000',
        placeholder: '10000',
        type: 'number',
        value:(this.cashTill)?this.cashTill['10000'].toString():""
      },
      {
        name: '5000',
        placeholder: '5000',
        type: 'number',
        value:(this.cashTill)?this.cashTill['5000'].toString():""
      },
      {
        name: '2000',
        placeholder: '2000',
        type: 'number',
        value:(this.cashTill)?this.cashTill['2000'].toString():""
      },
      {
        name: '1000',
        placeholder: '1000',
        type: 'number',
        value:(this.cashTill)?this.cashTill['1000'].toString():""
      },
      {
        name: '500',
        placeholder: '500',
        type: 'number',
        value:(this.cashTill)?this.cashTill['500'].toString():""
      },
      {
        name: '100',
        placeholder: '100',
        type: 'number',
        value:(this.cashTill)?this.cashTill['100'].toString():""
      },
      {
        name: '50',
        placeholder: '50',
        type: 'number',
        value:(this.cashTill)?this.cashTill['50'].toString():""
      },
      {
        name: '10',
        placeholder: '10',
        type: 'number',
        value:(this.cashTill)?this.cashTill['10'].toString():""
      },
      {
        name: '5',
        placeholder: '5',
        type: 'number',
        value:(this.cashTill)?this.cashTill['5'].toString():""
      },
      {
        name: '1',
        placeholder: '1',
        type: 'number',
        value:(this.cashTill)?this.cashTill['1'].toString():""
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
            10000:isNaN(parseInt(data['10000']))?0:parseInt(data['10000']),
            5000:isNaN(parseInt(data['5000']))?0:parseInt(data['5000']),
            2000:isNaN(parseInt(data['2000']))?0:parseInt(data['2000']),
            1000:isNaN(parseInt(data['1000']))?0:parseInt(data['1000']),
            500:isNaN(parseInt(data['500']))?0:parseInt(data['500']),
            100:isNaN(parseInt(data['100']))?0:parseInt(data['100']),
            50:isNaN(parseInt(data['50']))?0:parseInt(data['50']),
            10:isNaN(parseInt(data['10']))?0:parseInt(data['10']),
            5:isNaN(parseInt(data['5']))?0:parseInt(data['5']),
            1:isNaN(parseInt(data['1']))?0:parseInt(data['1'])
          }
          console.log(this.cashTill);
          this.calculateTotalCashTill();
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

  getStatus() {
    return (this.totalExpenses==this.total || Math.abs(this.total-this.totalExpenses)<=500);
  }
}
