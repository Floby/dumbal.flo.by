import Service from '@ember/service';

export default Service.extend({
  warning (message) {
    window.alert(message)
  }
});
