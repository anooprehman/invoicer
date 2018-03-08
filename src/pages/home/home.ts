import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Printer, PrintOptions } from '@ionic-native/printer';

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  printTaken:boolean = false;
  ZPrintTaken:boolean = false;
  regClosed:boolean = false;
  invoiceDate:string;
  todaysSales:any;
  startAmount:any;
  total:any = 0;
  extraCash:any;
  totalCashTill:any = 0;
  expenses:any;
  coupons:any;
  totalExpenses:any = 0;
  creditCardPayments:any;
  mistakeAmount:any;
  ownerAmount:any;
  closeAmount:any=0;
  cashOwner:string = "";
  mistake:string = "+";
  comments:string = "";
  cashTill:{ 10000: number, 5000: number, 2000: number,1000: number, 500: number, 100: number,50: number, 10: number };
  expenseDetails:Array<{item:string,price:any}> = [{item:"",price:""}];

  constructor(public navCtrl: NavController, afDB: AngularFireDatabase, private alertCtrl: AlertController,private printer: Printer, public toastCtrl: ToastController) {
    this.items = afDB.list('invoices').valueChanges();
    this.itemsRef = afDB.list('invoices');
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    this.invoiceDate = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
  }

  checkTotal() {
    let todays = isNaN(parseFloat(this.todaysSales))?0:parseFloat(this.todaysSales);
    let start = isNaN(parseFloat(this.startAmount))?0:parseFloat(this.startAmount);
    this.total = todays + start;
  }

  calculateTotalCashTill() {
    let extra = isNaN(parseFloat(this.extraCash))?0:parseFloat(this.extraCash);
    this.totalCashTill = 10000*this.cashTill['10000'] +
    5000*this.cashTill['5000'] +
    2000*this.cashTill['2000'] +
    1000*this.cashTill['1000'] +
    500*this.cashTill['500'] +
    100*this.cashTill['100'] +
    50*this.cashTill['50'] +
    10*this.cashTill['10'] +
    extra;
  }

  checkAllExpenses() {
    let expense = isNaN(parseFloat(this.expenses))?0:parseFloat(this.expenses);
    let creditCardPayment = isNaN(parseFloat(this.creditCardPayments))?0:parseFloat(this.creditCardPayments);
    let ownerAmount = isNaN(parseFloat(this.ownerAmount))?0:parseFloat(this.ownerAmount);
    let coupon = isNaN(parseFloat(this.coupons))?0:parseFloat(this.coupons);
    let mistakeAmt = isNaN(parseFloat(this.mistakeAmount))?0:parseFloat(this.mistakeAmount);
    this.totalExpenses = parseFloat(this.totalCashTill) + expense + creditCardPayment + ownerAmount + coupon;
    if(this.mistake == "-")
      this.totalExpenses = this.totalExpenses - mistakeAmt;
    else
      this.totalExpenses = this.totalExpenses + mistakeAmt;
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
            10:isNaN(parseInt(data['10']))?0:parseInt(data['10'])
          }
          this.calculateTotalCashTill();
          this.checkAllExpenses();
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

  addDetails() {
    this.expenseDetails.push({item:"",price:""});
  }

  removeItem(item){
    console.log(this.expenseDetails,item);
    let index = this.expenseDetails.indexOf(item);

    if(index > -1){
      this.expenseDetails.splice(index, 1);
    }
  }

  addItem() {
    let revDate:any = 0 - new Date(this.invoiceDate).getTime();
    let data = { 
      invoiceDate: this.invoiceDate,
      reverseDate: revDate,
      startAmount: isNaN(parseFloat(this.startAmount))?0:parseFloat(this.startAmount),
      xPrintTaken: this.printTaken,
      todaysSales: isNaN(parseFloat(this.todaysSales))?0:parseFloat(this.todaysSales),
      total: isNaN(parseFloat(this.total))?0:parseFloat(this.total),
      extraCash: isNaN(parseFloat(this.extraCash))?0:parseFloat(this.extraCash),
      totalCashTill: isNaN(parseFloat(this.totalCashTill))?0:parseFloat(this.totalCashTill),
      expenses: isNaN(parseFloat(this.expenses))?0:parseFloat(this.expenses),
      creditCardPayments: isNaN(parseFloat(this.creditCardPayments))?0:parseFloat(this.creditCardPayments),
      coupons: isNaN(parseFloat(this.coupons))?0:parseFloat(this.coupons),
      mistake: this.mistake,
      mistakeAmount: isNaN(parseFloat(this.mistakeAmount))?0:parseFloat(this.mistakeAmount),
      cashOwner: this.cashOwner,
      ownerAmount: isNaN(parseFloat(this.ownerAmount))?0:parseFloat(this.ownerAmount),
      totalExpenses: isNaN(parseFloat(this.totalExpenses))?0:parseFloat(this.totalExpenses),
      status: this.totalExpenses-this.total,
      ZPrintTaken: this.ZPrintTaken,
      regClosed: this.regClosed,
      expenseDetails: this.expenseDetails,
      comments: this.comments
    };
    let ref = this.itemsRef.push(data).then((item) => {
      this.presentToast();
      this.navCtrl.push('invoice',{invoice: data}, { animate: true, direction: 'forward' });
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Saved successfully',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { text: newText });
  }
  deleteItem(key: string) {    
    this.itemsRef.remove(key); 
  }
  deleteEverything() {
    this.itemsRef.remove();
  }

  save(){
    this.addItem();
  }
}
