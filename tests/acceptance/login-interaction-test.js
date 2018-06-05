import { module, test } from 'qunit';
import { fillIn, find, click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
/*global server */

module('Acceptance | login interaction', function(hooks) {
  setupApplicationTest(hooks);
  

  test('logging in and checking forwarding routes and name display', async function(assert) {
    server.create('user',{name: "oscar", role:"admin"});
    
    assert.expect(4);
    
    
    await visit('/');

    assert.equal(currentURL(), '/');
    
    await click('[data-test-toggle-menu]');
    
    assert.ok(find('.collapse.in'))
    
    await click('[data-test-toggle-menu]');
    
    assert.ok(!(find('.collapse.in')))
    
    await click('[data-test-toggle-menu]');
    
    fillIn('[data-test-login-username]','username');
    fillIn('[data-test-login-password]','password');
    
    await click('[data-test-send-login]');
    
    assert.equal(find('p').innerText,"oscar", "show user name");
    
  });
});
