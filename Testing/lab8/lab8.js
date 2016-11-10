//mocha -t 10000 selenium-webdriver/example/google_search_test.js

const {Builder, By, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

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
        yield driver.findElement(By.id('password')).sendKeys('');
        yield driver.findElement(By.name('commit')).click();
        yield driver.wait(until.titleIs('GitHub'), 2000);
    });

    test.it('git', function*() {
        yield driver.get('https://github.com');
        yield driver.findElement(By.name('q')).sendKeys('dimasauchanka@gmail.com');
    });

    test.after(() => driver.quit());
});
