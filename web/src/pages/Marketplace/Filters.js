export const filters = {
  achievements,
  openingList,
  colors,
  ratings,
  titles,
  timeControls,
  terminations,
  outcomes,
  moveCounts
}

const achievements = [
  {
    // index 0
    name: 'Win a game',
    points: 2,
  },
  {
    // index 1
    name: 'Play a game',
    points: 1,
  },
  {
    // index 2
    name: 'Win a game against opponent rated 750+',
    points: 3,
  },
  {
    // index 3
    name: 'Play a game against opponent rated 750+',
    points: 2,
  },
  {
    // index 4
    name: 'Win a game against opponent rated 1500+',
    points: 4,
  },
  {
    // index 5
    name: 'Play a game against opponent rated 1500+',
    points: 2,
  },
  {
    // index 6
    name: 'Play a game against opponent rated 2000+',
    points: 3,
  },
  {
    // index 7
    name: 'Win a game against opponent rated 2000+',
    points: 5,
  },
  {
    // index 8
    name: 'Play a game against opponent rated 2250+',
    points: 3,
  },
  {
    // index 9
    name: 'Win a game against opponent rated 2250+',
    points: 6,
  },
  {
    // index 10
    name: 'Defeat an IM',
    points: 4,
  },
  {
    // index 11
    name: 'Defeat a NM',
    points: 3,
  },
  {
    // index 12
    name: 'Defeat a GM',
    points: 5,
  },
  {
    // index 13
    name: 'Mate with a bishop',
    points: 4,
  },
  {
    // index 14
    name: 'Mate with a knight',
    points: 4,
  },
  {
    // index 15
    name: 'Mate with a pawn',
    points: 4,
  },
  {
    // index 16
    name: 'Complete a game with more than 100 moves',
    points: 2,
  },
  {
    // index 17
    name: 'Complete a game with more than 150 moves',
    points: 3,
  },
  {
    // index 18
    name: 'Complete a game with more than 250 moves',
    points: 6,
  },
  {
    // index 19
    name: 'Win with checkmate in less than 10 moves',
    points: 2,
  },
  {
    // index 20
    name: 'Win with checkmate in <5 moves',
    points: 3,
  },
  {
    // index 21
    name: 'Win with checkmate in 2 moves',
    points: 5,
  },
  {
    // index 22
    name: 'Draw with a higher rated player',
    points: 2,
  },
  {
    // index 23
    name: 'Queen side castle',
    points: 1,
  },
  {
    // index 24
    name: 'Under-promote to a knight',
    points: 3,
  },
  {
    // index 25
    name: 'Under-promote to a bishop',
    points: 5,
  },
  {
    // index 26
    name: 'En Passant',
    points: 2,
  },
  {
    // index 27
    name: 'Checkmate with an En Passant',
    points: 10,
  },
  {
    // index 28
    name: 'Draw when opponent has a queen, without one',
    points: 4,
  },
  {
    // index 29
    name: 'Draw by repetition',
    points: 1,
  },
  {
    // index 30
    name: 'Defeat a higher rated player',
    points: 3,
  },
  {
    // index 31
    name: 'Put opponent in check',
    points: 1,
  },
  {
    // index 32
    name: 'Capture <4 pawns',
    points: 1,
  },
  {
    // index 33
    name: 'Capture all pawns',
    points: 2,
  },
  {
    // index 34
    name: 'Capture all knights and bishops without losing any.',
    points: 5,
  },
  {
    // index 35
    name: 'Move king >20 times',
    points: 1,
  },
  {
    // index 36
    name: 'Capture all pawns without losing any',
    points: 5,
  },
]

const openingList = [
  "King's pawn game",
  "Queen's Gambit",
  'Ruy Lopez',
  'French Defense',
  'Caro-Kann',
  'Reti Opening',
  'English',
  'Norwegian',
  'Italian',
  "Bird's Opening",
  'Scandinavian',
  'Scotch',
]

const colors = ['white', 'black']

const ratings = [
  '< 750',
  '750 - 999',
  '1000 - 1499',
  '1500 - 1999',
  '2000 - 2199',
  '2200 - 2399',
  '2400+',
]

const titles = [
  {
    label: 'Grandmaster',
    data: 'gm',
  },
  {
    label: 'International Master',
    data: 'im',
  },
  {
    label: 'New Master',
    data: 'nm',
  },
  {
    label: 'No Title',
    data: null,
  },
]

const timeControls = [
  {
    label: '1 minute',
    data: 60,
  },
  {
    label: '2 minutes',
    data: 120,
  },
  {
    label: '5 minutes',
    data: 300,
  },
  {
    label: '10 minutes',
    data: 600,
  },
  {
    label: '30 minutes',
    data: 1800,
  },
  {
    label: '1 hour',
    data: 3600,
  },
  {
    label: 'Untimed',
    data: null,
  },
]

const terminations = [
  'Checkmate',
  'Resignation',
  'Stalemate',
  'Insufficient Material',
]

const outcomes = [
  {
    label: 'White wins',
    data: 'white',
  },
  {
    label: 'Black wins',
    data: 'black',
  },
  {
    label: 'Draw',
    data: 'draw',
  },
]

const moveCounts = ['< 10', '10 - 49', '50 - 99', '100 - 199', '200+']
