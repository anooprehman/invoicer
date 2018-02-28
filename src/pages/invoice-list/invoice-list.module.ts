import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceListPage } from './invoice-list';

@NgModule({
  declarations: [
    InvoiceListPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceListPage),
  ],
  exports: [
    InvoiceListPage
  ]
})
export class InvoiceListPageModule {}
