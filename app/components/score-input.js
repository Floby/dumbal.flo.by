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
    const value = this.get('value')
    this.set('inputValue', value)
  },

  sign: computed('positive', function () {
    return this.get('positive') ? '+' : '—'
  }),

  onActualValueChange: observer('value', function () {
    const absoluteInputValue = Math.abs(this.get('inputValue'))
    const absoluteValue = Math.abs(this.get('value'))
    if (absoluteValue !== absoluteInputValue) {
      this.assignValue()
    }
  }),

  onInputValueChange: observer('inputValue', function () {
    const inputValue = Number(this.get('inputValue'))
    const positive = this.get('positive')
    if (inputValue > 0) {
      const value = inputValue * (positive ? 1 : -1)
      this.set('value', value)
    } else {
      this.set('value', inputValue)
    }

    if (this.get('value') < 0) {
      this.set('positive', false)
    } else {
      this.set('positive', true)
    }
  }),

  onSignChange: observer('positive', function () {
    const positive = this.get('positive')
    const inputValue = Number(this.get('inputValue')) || 0
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
      if (!this.get('positive') && this.get('value') < 0) {
        this.set('inputValue', Math.abs(this.get('value')))
      }
    }
  }
})
