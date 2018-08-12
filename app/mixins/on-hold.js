import Mixin from '@ember/object/mixin';
import ms from 'ms';

export default Mixin.create({
  onHoldTimeout: null,
  onHoldDelay: '1s',
  mouseDown () {
    this.onHoldTimeout = setTimeout(() => {
      this.onHold()
    }, ms(this.get('onHoldDelay')))
  },

  mouseUp () {
    if (this.onHoldTimeout) {
      clearTimeout(this.onHoldTimeout)
      delete this.onHoldTimeout
    }
  },
});
