import Component from '@ember/component';

export default Component.extend({
  classNames: ['mat-input-container'],
  tagName: 'span',
  isThere: true,
  value: null,
  type: 'text',
  name: null,

  hasValue: function () {
    const value = this.get('value')
    return Boolean(value) || value === 0
  }.property('value')
});

