import Service from '@ember/service';
import Ember from 'ember';

let { inject } = Ember;


export default Service.extend({
    isAuthenticated: false,
    session: inject.service('session'),
    store: inject.service('store'),
    user: null,
    
    authenticate(authenticator, creds, pw){
        let prom = this.get('session').authenticate('authenticator:oauth2pwg', creds, pw);
        prom.then(
            ()=>{
                let query = this.get('store').findRecord('user',1);
                this.set('user', query);
                this.set('isAuthenticated', true);
            },
            ()=>{
                this.set('user', null);
                this.set('isAuthenticated', false);
            }
        );
        
        return prom;
    },
    
    invalidate(){
        this.set('user', null);
        this.set('isAuthenticated', false);
        return this.get('session').invalidate();
    }
});
