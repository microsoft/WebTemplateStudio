import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('.navbar-brand')).getText();
  }

  async getNavigationElements(): Promise<number> {
   return element.all(by.css('.nav-link')).count();
  }
}
