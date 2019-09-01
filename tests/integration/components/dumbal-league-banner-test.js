import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dumbal-league-banner', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{dumbal-league-banner}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#dumbal-league-banner}}
        template block text
      {{/dumbal-league-banner}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
