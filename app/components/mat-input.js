import Component from '@ember/component';
import { computed } from '@ember/object'

export default Component.extend({
  classNames: ['mat-input-container'],
  tagName: 'span',
  isThere: true,
  value: null,
  type: 'text',
  name: null,

  hasValue: computed('value', function () {
    const value = this.value
    return Boolean(value) || value === 0
  }),
});

