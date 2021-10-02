import { db } from './db'

//table of achievements addressable by order #
const achievements = [
  {
    name: 'Win a game',
    points: 1,
  },
  {
    name: 'Finish a game',
    points: 1,
  },
  {
    name: 'Win a game rated 750+',
    points: 2,
  },
  {
    name: 'Play a game rated 750+',
    points: 1,
  },
  {
    name: 'Win a game rated 1500+',
    points: 2,
  },
  {
    name: 'Play a game rated 1500+',
    points: 1,
  },
  {
    name: 'Play a game rated 2000+',
    points: 2,
  },
  {
    name: 'Win a game rated 2000+',
    points: 2,
  },
  {
    name: 'Play a game rated 2250+',
    points: 3,
  },
  {
    name: 'Win a game rated 2250+',
    points: 4,
  },
  {
    name: 'Defeat an IM',
    points: 4,
  },
  {
    name: 'Defeat a NM',
    points: 4,
  },
  {
    name: 'Defeat a GM',
    points: 5,
  },
  {
    name: 'Mate with a bishop',
    points: 2,
  },
  {
    name: 'Mate with a knight',
    points: 3,
  },
  {
    name: 'Mate with a pawn',
    points: 5,
  },
  {
    name: 'Complete a game with more than 100 moves',
    points: 1,
  },
  {
    name: 'Complete a game with more than 150 moves',
    points: 2,
  },
  {
    name: 'Complete a game with more than 250 moves',
    points: 3,
  },
  {
    name: 'Win with checkmate in less than 10 moves',
    points: 2,
  },
  {
    name: 'Win with checkmate in <5 moves',
    points: 3,
  },
  {
    name: 'Win with checkmate in 2 moves',
    points: 5,
  },
  {
    name: 'Draw with a higher rated player',
    points: 2,
  },
  {
    name: 'Queen side castle',
    points: 1,
  },
  {
    name: 'Under-promote to a knight',
    points: 1,
  },
  {
    name: 'Under-promote to a bishop',
    points: 1,
  },
  {
    name: 'En Passent',
    points: 2,
  },
  {
    name: 'Checkmate with an En Passent',
    points: 5,
  },
  {
    name: 'Draw when opponent has a queen, without one',
    points: 2,
  },
  {
    name: 'Draw by repetition',
    points: 1,
  },
  {
    name: 'Defeat a higher ranked player',
    points: 1,
  },
  {
    name: 'Put opponent in check',
    points: 1,
  },
  {
    name: 'Capture <4 pawns',
    points: 1,
  },
  {
    name: 'Capture all pawns',
    points: 2,
  },
  {
    name: 'Capture all knights and bishops without losing any.',
    points: 4,
  },
  {
    name: 'Move king <20 times',
    points: 1,
  },
  {
    name: 'Capture all pawns without losing any',
    points: 4,
  },
  // {
  //   name: '',
  //   points: 1,
  // },
  //
]

const rarities = [
  {
    level: 0,
    rarityTitle: 'Basic',
  },
  {
    level: 1,
    rarityTitle: 'Common',
  },
  {
    level: 2,
    rarityTitle: 'Uncommon',
  },
  {
    level: 3,
    rarityTitle: 'Rare',
  },
  {
    level: 4,
    rarityTitle: 'Mythic',
  },
]

function getCardPointsByAchievementNum(a1, a2, a3) {
  return achievements[a1] + chievements[a2] + chievements[a3]
}

function getCardLevel(a1, a2, a3) {
  var points = achievements[a1] + chievements[a2] + chievements[a3]
}
//
//
//
//
//
//
//
//
//
//
//
//
//
