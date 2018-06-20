import { module, test } from 'qunit';
import { fillIn, find, click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
/*global server */

module('Acceptance | login interaction', function(hooks) {
  setupApplicationTest(hooks);
  

  test('logging in and checking forwarding routes and name display', async function(assert) {
    
    assert.expect(6);
    
    server.create('user',{name: "oscar", role:"admin"});
    
    server.post('/tok',(db, request) => {
      let params = request.requestBody;
      assert.deepEqual(
        params, 
        'grant_type=password&username=username&password=password', 
        "check if credetials were included in oauth2 format"
      );
      // the validation in ESA-password-grant looks for access_token key
      return {access_token: 'testtoken'};
    })
    
     server.get('/users/1',(db, request) => {
      let params = request.requestHeaders
      assert.equal(params.Authorization, 'Bearer testtoken', 
        "see if authorizer added token header")
      return db.users.find(1)
      
    })
    
    
    
    await visit('/');

    assert.equal(currentURL(), '/', 'check if URL is /');
    
    await click('[data-test-toggle-menu]');
    
    assert.ok(find('.collapse.show'),"see if menu was opened")
    
    await click('[data-test-toggle-menu]');
    
    assert.ok(!(find('.collapse.show')), "check if menu was closed")
    
    await click('[data-test-toggle-menu]');
    
    fillIn('[data-test-login-username]','username');
    fillIn('[data-test-login-password]','password');
    
    await click('[data-test-send-login]');
    
    
    
    assert.equal(find('p').innerText,"oscar", "show user name");
    
  });
});
