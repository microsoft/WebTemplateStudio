import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('.navbar-brand')).getText() as Promise<string>;
  }

  getNavigationElements() {
   return element.all(by.css('.nav-link')).count() as Promise<number>;
  }
}
