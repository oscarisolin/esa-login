import { providerState } from 'ember-cli-pact';

providerState('an admin exists', (server) => {
server.create('user',{name: "oscar", role:"admin"});
});
