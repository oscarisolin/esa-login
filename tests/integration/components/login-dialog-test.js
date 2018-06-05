import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import { click, fillIn, render, find } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';



let sessionstub = Service.extend({
  isAuthenticated: false,
  
  authenticate(aut, cred, pass){
    
    if (cred == 'username' && pass == 'password'){
      this.set('isAuthenticated', true);
      return Promise.resolve();
    }else{
      return Promise.reject(new Error ('invalid'));
    }
    
  },
  invalidate(){
    this.set('isAuthenticated', false);
     return Promise.resolve();
  }
})


module('login-dialog', 'Integration | Component | login dialog', function(hooks){
  setupRenderingTest(hooks);
  
  hooks.beforeEach(function() {
    this.owner.register('service:session', sessionstub);
  });
  
  test('it renders', async function(assert) {
    
    await render(hbs`{{login-dialog}}`);
  
    assert.equal(find(`[data-test-send-login]`).innerText, 'Login');
  
  });
  
  test('right credentials', async function(assert){
    assert.expect(2);
    await render(hbs`{{login-dialog}}`);
    
    await fillIn('[data-test-login-username]', 'username');
    await fillIn('[data-test-login-password]', 'password');
    await click('[data-test-send-login]');
    
    assert.equal(find('[data-test-logout]').innerText,"Logout","Logout");
      
    await click('[data-test-logout]');
    
    assert.equal(find(`[data-test-send-login]`).innerText,"Login","Login");
    
    
  });

  test('wrong credentials', async function(assert){
    await render(hbs`{{login-dialog}}`);
    await fillIn('[data-test-login-username]', 'wrong@tests.de');
    await fillIn('[data-test-login-password]', 'some');
    await click('[data-test-send-login]');
  
    assert.equal(find(`[data-test-send-login]`).innerText,"Login","Login");
    assert.equal(find('.alert.alert-warning').innerHTML,"Wrong credentials. Please try again.","Error message");
  
  });


});
