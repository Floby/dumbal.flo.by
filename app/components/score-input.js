import Component from '@ember/component'
import { computed, observer } from '@ember/object'

export default Component.extend({
  tagName: 'span',
  classNames: ['score-input'],
  classNameBindings: ['positive:positive:negative'],
  value: null,
  name: null,
  positive: true,

  inputValue: null,

  init () {
    this._super(...arguments)
    this.assignValue()
  },

  assignValue () {
    const value = this.value
    this.set('inputValue', value)
  },

  sign: computed('positive', function () {
    return this.positive ? '+' : '—';
  }),

  onActualValueChange: observer('value', function () {
    const absoluteInputValue = Math.abs(this.inputValue)
    const absoluteValue = Math.abs(this.value)
    if (absoluteValue !== absoluteInputValue) {
      this.assignValue()
    }
  }),

  onInputValueChange: observer('inputValue', function () {
    const inputValue = Number(this.inputValue)
    const positive = this.positive
    if (inputValue > 0) {
      const value = inputValue * (positive ? 1 : -1)
      this.set('value', value)
    } else {
      this.set('value', inputValue)
    }

    if (this.value < 0) {
      this.set('positive', false)
    } else {
      this.set('positive', true)
    }
  }),

  onSignChange: observer('positive', function () {
    const positive = this.positive
    const inputValue = Number(this.inputValue) || 0
    if (inputValue > 0) {
      const value = inputValue * (positive ? 1 : -1)
      this.set('value', value)
    } else {
      this.set('value', inputValue)
    }
  }),

  actions: {
    toggleSign () {
      this.toggleProperty('positive')
    },
    onInputBlur () {
      if (!this.positive && this.value < 0) {
        this.set('inputValue', Math.abs(this.value))
      }
    }
  }
})
