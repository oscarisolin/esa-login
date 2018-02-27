import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
// import { run } from '@ember/runloop';
// import { set } from '@ember/object'; 
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
  
    assert.equal(find('button').innerHTML, 'Login');
  
  });
  
  test('right credentials', async function(assert){
    assert.expect(2);
    await render(hbs`{{login-dialog}}`);
    
    await fillIn('#loginDialog_username', 'username');
    await fillIn('#loginDialog_password', 'password');
    await click('.btn.btn-primary');
    
    assert.equal(find('.btn.btn-secondary').innerHTML,"Logout","Logout");
      
    await click('.btn.btn-secondary');
    
    assert.equal(find('.btn.btn-primary').innerHTML,"Login","Login");
    
    
  });

  test('wrong credentials', async function(assert){
    await render(hbs`{{login-dialog}}`);
    await fillIn('#loginDialog_username', 'wrong@tests.de');
    await fillIn('#loginDialog_password', 'some');
    await click('.btn.btn-primary');
  
    assert.equal(find('.btn.btn-primary').innerHTML,"Login","Login");
    assert.equal(find('.alert.alert-warning').innerHTML,"Wrong credentials. Please try again.","Error message");
  
  });


});
