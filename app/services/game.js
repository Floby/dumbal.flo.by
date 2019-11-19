import moment from 'moment';
import { get } from '@ember/object'
import Service from '@ember/service';
import { inject } from '@ember/service';
import Game, { Player } from '../models/game';

export default Service.extend({
  localStore: inject(),
  gameStore: null,
  loaded: null,
  init () {
    this._super(...arguments)
    this.gameStore = this.localStore.namespace('games.v0')
    this.loaded = {}
  },
  list () {
    const keys = this.gameStore.keys()
    const games = keys.map((key) => this.load(key))
    return games.sort((a, b) => {
      const dateA = a.get('startDate')
      const dateB = b.get('startDate')
      if (!dateA && dateB) return 1
      if (!dateB && dateA) return -1
      return dateA < dateB
    })
  },


  load(gameId) {
    if (this.loaded[gameId]) {

      return this.loaded[gameId]
    }
    const serializedGame = this.gameStore.get(gameId);
    if (!serializedGame) {
      throw Error(`Could not find Game with Id ${String(gameId)}`)
    }
    const game = Game.create({
      id: gameId,
      startDate: serializedGame.startDate,
      endDate: serializedGame.endDate,
      parentId: serializedGame.parentId,
      isLeague: Boolean(serializedGame.isLeague)
    })
    this.updateGameFromPayload(game, serializedGame)
    this.loaded[gameId] = game
    return game
  },

  getById (gameId) {
    return this.load(gameId)
  },

  archiveGame (game) {
    game.set('archived', true)
    this.save(game);
  },

  save (game) {
    const serialized = {
      name: game.get('name'),
      parentId: game.get('parentId'),
      startDate: game.get('startDate'),
      endDate: game.get('endDate'),
      isLeague: game.get('isLeague'),
      players: game.get('players').map((player) => {
        return {
          name: player.get('name'),
          scores: player.get('scores')
        }
      }),
      archived: game.get('archived')
    }
    this.gameStore.set(game.get('id'), serialized);
    return game;
  },

  createNewGame (name, playerNames, parent, isLeague) {
    let parentId
    if (parent) {
      parentId = get(parent, 'id')
    }
    const startDate = moment.utc().format();
    const game = Game.create({ name, startDate, parentId, isLeague })
    playerNames.forEach((name) => game.addPlayer(name))
    return this.save(game)
  },

  updateGameFromPayload (game, serialized) {
    game.set('name', serialized.name)
    const loadedPlayers = serialized.players.map((player) => {
      return Player.create(Object.assign({ game }, player))
    })
    game.set('players', loadedPlayers)
    game.set('archived', Boolean(serialized.archived))
  }
});
