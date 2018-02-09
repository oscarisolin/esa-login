import Component from '@ember/component';
import Ember from 'ember';

let {inject} = Ember;

export default Component.extend({
    session: inject.service('session'),
    
    username: "",
    password: "",
    
    actions: {
        send(){
            let {username, password} = this.get("username","password");
            this.get('session').authenticate('authenticator:oauth2pwg',username,password);
        }
    }
});
