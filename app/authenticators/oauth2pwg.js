import PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default PasswordGrant.extend({serverTokenEndpoint: '/api/tok'},{

});
