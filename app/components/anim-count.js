import Component from '@ember/component';
import animate from 'amator';
import { observer } from '@ember/object'

export default Component.extend({
  value: 0,
  displayValue: 0,
  duration: 300,

  init () {
    this._super(...arguments)
    this.set('displayValue', this.get('value'))
  },

  onValueChange: observer('value', function () {
    const previousValue = this.get('displayValue')
    const nextValue = this.get('value')
    animate(
      { value: previousValue },
      { value: nextValue },
      {
        duration: this.get('duration'),
        easing: 'easeOut',
        step: ({ value }) => {
          this.set('displayValue', Math.floor(value));
        },
        done: () => {
          this.set('displayValue', nextValue)
        }
      }
    )
  })
});
