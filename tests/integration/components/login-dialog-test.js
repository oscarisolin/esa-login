import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-dialog', 'Integration | Component | login dialog', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{login-dialog}}`);

  assert.equal(this.$('.btn-primary').text().trim(), 'Login');


});

test('right credentials', function(assert){
  this.render(hbs`{{login-dialog}}`);
  this.$('#loginDialog.username').value('you@example.com');
  this.$('#loginDialog.password').value('testpassword');
  this.$('.btn .btn-primary').click();
  
  assert.equal(this.$('.btn .btn-primary').value,"Logout","Logout")
  
});