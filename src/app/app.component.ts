import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:string = 'home';
  pages: Array<{ title: string, component: any, index: number, icon: string }>;
  activePageIndex: number = 0;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.pages = [
      { title: 'Home', component: 'home', index: 0, icon: 'home' },
      { title: 'Invoice List', component: 'invoice-list', index: 1, icon: 'list' },
      { title: 'Expense List', component: 'expense-list', index: 2, icon: 'cash' },
    ];
    console.log(this.pages);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component, {}, { animate: true, direction: 'forward' });
    this.activePageIndex = page.index;
  }

  checkActivePage(index: number): boolean {
    return index === this.activePageIndex;
  }
}

