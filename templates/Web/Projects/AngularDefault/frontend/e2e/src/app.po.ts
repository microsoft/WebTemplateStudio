import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<any> {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('.navbar-brand')).getText() as Promise<string>;
  }

  getNavigationElements(): Promise<number> {
   return element.all(by.css('.nav-link')).count() as Promise<number>;
  }
}
