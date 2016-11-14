//mocha -t 10000 selenium-webdriver/example/google_search_test.js

const {Builder, By, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('selenium-webdriver/testing/assert');

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
//var By = webdriver.By,
//    Builder = webdriver.Builder;
//    until = webdriver.until;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

test.describe('GitHub', function() {

    test.it('login', function*() {
        yield driver.get('https://github.com/login');
        yield driver.findElement(By.id('login_field')).sendKeys('dimasauchanka@gmail.com');
        yield driver.findElement(By.id('password')).sendKeys('dimentar_github_123');
        yield driver.findElement(By.name('commit')).click();
        yield driver.wait(until.titleIs('GitHub'), 5000);
    });

    test.it('search', function*() {
        yield driver.findElement(By.name('q')).sendKeys('node');
        yield driver.findElement(By.name('q')).sendKeys(webdriver.Key.RETURN);
        yield driver.wait(until.titleContains('Search'), 5000);
        let el = yield driver.findElement(By.name('q'));
        let value = yield el.getAttribute('value');
        assert(value).equalTo('node');
    });

    test.it('filter select', function*() {
        yield driver.findElement(By.className('js-select-menu')).click();
        yield driver.findElement(By.css('[href="https://github.com/search?o=desc&q=node&s=stars&type=Repositories&utf8=%E2%9C%93"]')).click();
        //TODO: test most stars
    });

    test.it('click star', function*() {
        yield driver.findElement(By.css('[href="https://github.com/nodejs/"]')).click();
        yield driver.findElement(By.linkText('node')).click();
        let el = yield driver.findElement(By.css('[href="/nodejs/node/stargazers"]')).click();
        //console.log(el.innerHTML());
        console.log(el.getText());
    });
    test.it('create Projects', function*() {
        yield driver.get('https://github.com/DimaSavchenko/Bsuir');
        yield driver.findElement(By.partialLinkText('Projects')).click();
        yield driver.wait(until.titleContains('Projects'), 5000);
        yield driver.findElement(By.linkText('Create a project')).click();
        yield driver.findElement(By.id('project_name')).sendKeys('new project');
        yield driver.findElement(By.css('.form-actions button')).click();
        yield driver.wait(until.titleIs('new project'), 5000);
    });

    test.after(() => driver.quit());
});
