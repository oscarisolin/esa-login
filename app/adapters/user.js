// import DS from 'ember-data';

// export default DS.JSONAPIAdapter.extend({
//     namespace: '/api'
// });

import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    namespace: '/api',
    authorizer: 'authorizer:oauth2bearer'
});