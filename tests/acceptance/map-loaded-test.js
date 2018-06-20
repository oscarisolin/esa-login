import { module, test } from 'qunit';
import { find, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | map loaded', function(hooks) {
  setupApplicationTest(hooks);

  test('see if map tiles are loaded /', async function(assert) {
    await visit('/');

    
    assert.ok(find('.leaflet-tile.leaflet-tile-loaded')) 
  });
});
