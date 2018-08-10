import Component from '@ember/component';
import { computed } from '@ember/object'

export default Component.extend({
  classNames: ['player-inline-list'],
  tagName: 'ul',

  playerDisplay: computed('players.{@each,length}', function () {
    const players = this.get('players');
    return players.map((player, index) => {
      let prefix = ''
      let suffix = ''
      if (player === players.get('lastObject')) {
        prefix = 'et '
      } else if (players.objectAt(index + 1) !== players.get('lastObject')) {
        suffix = ','
      }
      return {
        prefix, suffix,
        name: player.get('name'),
        isOut: player.get('isOut'),
        isWinner: player.get('isWinner')
      }
    })
  })
});
