import Controller from '@ember/controller';

export default Controller.extend({
    collapsed: true,
    
    actions: {
        toggle(){
            this.toggleProperty('collapsed');
        },
        afterLogin(){
            this.transitionToRoute('/auth/profile');
        }
    }
});
