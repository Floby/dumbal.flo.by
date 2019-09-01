import Mixin from '@ember/object/mixin';
import ms from 'ms';

export default Mixin.create({
  classNames: ['on-hold'],
  onHoldTimeout: null,
  onHoldDelay: '1s',
  didInsertElement () {
    this.$(this.onHoldSelector)
      .on('mousedown', () => this.holdStart())
      .on('touchstart', () => this.holdStart())
      .on('mouseup', () => this.holdStop())
      .on('touchend', () => this.holdStop())
      .on('touchleave', () => this.holdStop())
  },
  holdStart () {
    this.onHoldTimeout = setTimeout(() => {
      this.onHold()
    }, ms(this.onHoldDelay))
  },

  holdStop () {
    if (this.onHoldTimeout) {
      clearTimeout(this.onHoldTimeout)
      delete this.onHoldTimeout
    }
  },
});
