import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display navbar with app name', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toBe('wts.AngularDefault');
  });

  it('should contain at least one template page ', async () => {
    expect(await page.getNavigationElements()).toBeGreaterThanOrEqual(1);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
