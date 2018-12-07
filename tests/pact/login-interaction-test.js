import { module, test } from 'qunit';
// import { setupTest } from 'ember-qunit';
import { fillIn, find, click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupPact, given, interaction } from 'ember-cli-pact';
/*global server */

module('Pact | People', function(hooks) {
  setupApplicationTest(hooks);
  setupPact(hooks, {
    // Specify the names of the provider and consumer whose interactions are being set up.
    // Normally these values would be defaulted from global configuration for your app.
    providerName: 'my-api3'
  });

  test('locating a person by ID', async function(assert) {
      
    given('an admin exists');



    await visit('/');

    assert.equal(currentURL(), '/', 'check if URL is /');
    
    await click('[data-test-toggle-menu]');
    
    assert.ok(find('.collapse.show'),"see if menu was opened")
    
    await click('[data-test-toggle-menu]');
    
    assert.ok(!(find('.collapse.show')), "check if menu was closed")
    
    await click('[data-test-toggle-menu]');
    
    fillIn('[data-test-login-username]','username');
    fillIn('[data-test-login-password]','password');
    
    
    // Perform the interaction that this test is intended to record, in this case
    // fetching a user after authentication.
   
    await interaction(() =>  click('[data-test-send-login]'));
    
    
    
    assert.equal(find('p').innerText,"oscar", "show user name");
    // assert.ok(true)
  });
});