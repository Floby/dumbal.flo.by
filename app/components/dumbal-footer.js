import Component from '@ember/component';
import OnHold from '../mixins/on-hold'

export default Component.extend(OnHold, {
  onHoldSelector: 'a.github-logo',
  tagName: 'footer',
  classNameBindings: ['locked:locked:unlocked'],
  locked: true,
  onHold () {
    this.set('locked', false)
  }
});
