import Service from '@ember/service';
import store2 from 'store2'

export default Service.extend({
  init () {
    const store = store2;
    Object.entries(store).forEach(([key, value]) => {
      if (typeof value === 'function') {
        this[key] = value.bind(store)
      } else {
        this[key] = value
      }
    })
  }
});
