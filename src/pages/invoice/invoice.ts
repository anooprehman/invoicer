import { Component,ViewChild,ElementRef } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Printer } from '@ionic-native/printer';
import { SocialSharing } from '@ionic-native/social-sharing';

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
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams,private printer: Printer, private socialSharing: SocialSharing, public toastCtrl: ToastController) {
    this.item = this.navParams.get('invoice');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }

  print(){
    this.printer.isAvailable().then(()=>{
      console.log("available",this.printer);
      this.printer.pick().then((uri)=> {
        console.log(uri)
        this.printer.print(this.invoiceContent.nativeElement.innerHTML, { printerId: uri }).then(function(){
          alert("printing done successfully !");
        },function(){
          alert("Error while printing !");
        });
      });
      }, function(){
        console.log("not available")
        alert('Error : printing is unavailable on your device ');
      });
  }

  share() {
    // Check if sharing via email is supported
    this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
      this.socialSharing.shareViaEmail(this.invoiceContent.nativeElement.innerHTML, 'Invoice : '+new Date().toLocaleString(), ['anoop_ar@ymail.com']).then(() => {
        // Success!
        this.presentToast();
      }).catch(() => {
        // Error!
      });
    }).catch(() => {
      // Sharing via email is not possible
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Mail sent successfully',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}
