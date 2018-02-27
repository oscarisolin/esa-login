import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject } from '@ember/service';


export default Route.extend(ApplicationRouteMixin,{
    session: inject('session')
});
