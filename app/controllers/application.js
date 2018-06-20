import Controller from '@ember/controller';

export default Controller.extend({
    lat: 45.519743,
    lng: -122.680522,
    zoom: 10,
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
