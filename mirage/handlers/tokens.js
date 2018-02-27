import { debug } from '@ember/debug';
import Response from 'ember-cli-mirage/response';
import Object from '@ember/object';
import { assign } from '@ember/polyfills';
// import Ember from 'ember';

// function createFakeToken(obj) {
//   return 'a.' + window.btoa(JSON.stringify(obj)) + '.b';
// }

function decodeURL(str){
    let obj = {};
    let arr=str.split("&");
    for (let value of arr){
        obj[value.split("=")[0]] = value.split("=")[1];
    }
    
    return obj;
}

// function jwtEncode(obj){
    
// }
    

export default function(db, request) {
    
    
    debug(request.requestBody);
    let object = Object.create(decodeURL(request.requestBody))
    
    let response_body = {};
    let resp = new Response({
                'Cache-Control':'no-store',
                'Pragma': 'no-cache', 
                'Content-Type': 'application/json;charset=UTF-8'
                
            });
    
    if (object.password == 'password' && object.username == 'username'){
        response_body = {
           "access_token":"2YotnFZFEjr1zCsicMWpAA",
           "token_type":"bearer",
           "expires_in":2000,
           "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA"
        };
        assign(resp,{code: 200, data: response_body});
    }else{
        response_body = {
             "error":"invalid_request"
        };
        assign(resp,{code: 400, data: response_body});
    }
    return resp;
    
    
}