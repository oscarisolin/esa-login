import Component from '@ember/component';
import Ember from 'ember';

let {inject} = Ember;

export default Component.extend({
    session: inject.service('session'),
    
    username: "",
    password: "",
    message: "please fill in your credentials",
    e: "",
    
    actions: {
        send(){
            let {username, password} = this.getProperties("username","password");
            this.get('session').authenticate('authenticator:oauth2pwg',username,password)
            .then(()=>{
                this.set('message',"please fill in your credentials");
                this.set('e',"");
            }).catch((e)=> {
                this.set('e', e);
                this.set('message',"Wrong credentials. Please try again.");
            });
        },
        deauthenticate(){
            this.get('session').invalidate();
        }
    }
});
