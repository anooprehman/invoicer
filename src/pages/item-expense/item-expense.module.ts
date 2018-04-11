import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemExpensePage } from './item-expense';

@NgModule({
  declarations: [
    ItemExpensePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemExpensePage),
  ],
  exports: [
    ItemExpensePage
  ]
})
export class ItemExpensePageModule {}
