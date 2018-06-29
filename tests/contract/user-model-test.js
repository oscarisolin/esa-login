import { module, test } from 'qunit';
// import request from 'ember-ajax/request';
import ZSchema from 'z-schema';

// import { waitUntil } from '@ember/test-helpers'
// /*global server */
// import { setupApplicationTest } from 'ember-qunit';



function getSchema(url) {
    return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        
        xhr.open('GET', url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();
        
        function handler() {
          if (this.readyState === this.DONE) {
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(new Error('getSchema: `' + url + '` failed with status: [' + this.status + ']'));
            }
          }
        }
    });
}

module('Unit | Model | user', function() {
    // setupApplicationTest(hooks);

  test('test the schema for user model',async function(assert) {
    
    assert.expect(1)
    
    var validator = new ZSchema({
        noEmptyArrays: true
    });
    
    
    let schemaUrl = 'https://flask-fuhrman.c9users.io/';

    await getSchema(schemaUrl).then((response)=>{
            let schema = response;
            let valid = validator.validate({"required": [],"id": 12, "name": "oscar", "other": 5}, schema);
            let errors = validator.getLastErrors();
            let msg = ""
            if (errors !== undefined){
              msg = errors[0].message
            }
            assert.ok(valid, "validate user schema: " + msg);
        },(error)=>{
            assert.ok(false,"get user schema: " + error)
        })
    
    
    

  });
});
