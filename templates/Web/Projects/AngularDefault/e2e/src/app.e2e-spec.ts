import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import {name} from './../../package.json';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display navbar with app name', () => {
    expect(page.getTitleText()).toBe(name);
  });

  it('should contain at least one template page ', () => {
    expect(page.getNavigationElements()).toBeGreaterThanOrEqual(1);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
