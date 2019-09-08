import EmberObject from '@ember/object';
import Game from 'dumbal-league/models/game'

export default EmberObject.extend({
  serialize (game) {
    return JSON.stringify({
      v: 1,
      game: {
        id: game.id,
        n: game.name,
        ...(game.parentId ? { p: game.parentId } : {}),
        l: game.isLeague ? 1 : 0,
        s: game.startDate,
        ps: game.players.map((player) => player.name),
        rs: game.players.map((player) => player.scores.concat([]))
      }
    })
  },
  deserialize (payload) {
    const { game: body } = JSON.parse(payload)
    const game = Game.create({
      name: body.n,
      id: body.id,
      startDate: body.s,
      parentId: body.p,
      isLeague: Boolean(body.l)
    })
    body.ps.forEach((p, i) => {
      game.addPlayer(p)
      game.players[i].scores = body.rs[i]
    })

    return game
  }
});
