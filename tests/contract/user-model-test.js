import { module, test } from 'qunit';
// import request from 'ember-ajax/request';
import ZSchema from 'z-schema';
import { waitUntil } from '@ember/test-helpers'
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
    
    var validator = new ZSchema({
        noEmptyArrays: true
    });
    
    
    // var json = {};
    // var schema = { "$ref": "http://json-schema.org/draft-04/schema#" };
    
    // var valid = validator.validate(json, schema);
    
    

    let schemaUrl = 'https://flask-fuhrman.c9users.io/';
    
    
    
    await waitUntil(()=>
        getSchema(schemaUrl).then((response)=>{
            // console.log(response.responseBody);
            let schema = response.responseBody;
            var valid = validator.validate(schema, { "type": "number" });
            assert.ok(valid, "validate user schema");
        },(error)=>{
            assert.ok(false,"validate user schema: " + error)
        })
    )
    // request('https://flask-fuhrman.c9users.io/',{}).then(response => {
        
    // });
    

        
    
    
    
    
    

  });
});
