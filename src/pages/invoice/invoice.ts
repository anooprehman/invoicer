import { Component,ViewChild,ElementRef } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Printer, PrintOptions } from '@ionic-native/printer';

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
  @ViewChild('invoiceContent', {read: ElementRef}) invoiceContent: ElementRef;
  item:any;
  invoiceId:any;
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams,private printer: Printer) {
    this.item = this.navParams.get('invoice');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }

  print(){
    this.platform.ready().then(() => {
    this.printer.isAvailable().then(function(){
      console.log("available")
      this.printer.print(this.invoiceContent.nativeElement.innerHTML).then(function(){
        alert("printing done successfully !");
      },function(){
        alert("Error while printing !");
      });
      }, function(){
        console.log("not available")
        alert('Error : printing is unavailable on your device ');
      });
    })
  }
}
