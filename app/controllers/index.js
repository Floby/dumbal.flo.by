import Controller from '@ember/controller';
import { computed } from '@ember/object'

export default Controller.extend({
  hasOnlyArchivedGames: computed('model.@each.archived', function () {
    return !this.get('model').some((game) => !game.get('archived'))
  })
});
