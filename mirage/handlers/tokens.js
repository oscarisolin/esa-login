import { debug, inspect } from '@ember/debug';
import Response from 'ember-cli-mirage/response';
import Object from '@ember/object';

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
    
    if (object.password == 'password' && object.username == 'username'){
        response_body = {
           "access_token":"2YotnFZFEjr1zCsicMWpAA",
           "token_type":"bearer",
           "expires_in":2000,
           "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA"
        };
        return new Response(
            200, 
            {
                'Cache-Control':'no-store',
                'Pragma': 'no-cache', 
                'Content-Type': 'application/json;charset=UTF-8'
                
            },
            response_body
        );
    }else{
        response_body = {
             "error":"invalid_request"
        };
        return new Response(
            400, 
            {
                'Cache-Control':'no-store',
                'Pragma': 'no-cache', 
                'Content-Type': 'application/json;charset=UTF-8'
                
            },
            response_body
        );
    }
    
    
    
    // if request.requestBody
    return new Response(
        200, 
    {'Cache-Control':'no-store','Pragma': 'no-cache', 'Content-Type': 'application/json;charset=UTF-8'},
      response_body
    );
    
}