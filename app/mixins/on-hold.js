import Mixin from '@ember/object/mixin';
import ms from 'ms';

export default Mixin.create({
  classNames: ['on-hold'],
  onHoldTimeout: null,
  onHoldDelay: '1s',
  didInsertElement () {
    this.$()
      .on('mousedown', () => this.holdStart() || false)
      .on('touchstart', () => this.holdStart() || false)
      .on('mouseup', () => this.holdStop() || false)
      .on('touchend', () => this.holdStop() || false)
      .on('touchleave', () => this.holdStop() || false)
  },
  holdStart () {
    this.onHoldTimeout = setTimeout(() => {
      this.onHold()
    }, ms(this.get('onHoldDelay')))
  },

  holdStop () {
    if (this.onHoldTimeout) {
      clearTimeout(this.onHoldTimeout)
      delete this.onHoldTimeout
    }
  },
});
