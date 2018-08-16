import Component from '@ember/component';

export default Component.extend({
  classNames: ['labeled-switch'],
  actions: {
    toggleChanged () {
      this.set('value', !this.get('value'))
    }
  }
});
