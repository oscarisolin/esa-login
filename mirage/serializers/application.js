import { PactEnabled } from 'ember-cli-pact/mock-provider/mirage';
import { JSONAPISerializer } from 'ember-cli-mirage';

export default PactEnabled(JSONAPISerializer).extend({

});