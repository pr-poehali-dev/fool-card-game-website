
export interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades' | 'joker';
  value: string;
  color: string;
  rank: number;
}

// Создаем колоду карт (54 карты: 52 стандартные + 2 джокера)
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const ranks = {
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
};

export const cards: Card[] = [
  // Генерируем 36 стандартных карт
  ...suits.flatMap(suit => 
    values.map(value => ({
      suit: suit as Card['suit'],
      value,
      color: suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black',
      rank: ranks[value]
    }))
  ),
  // Добавляем 2 джокера
  {
    suit: 'joker',
    value: 'Joker',
    color: 'red',
    rank: 15
  },
  {
    suit: 'joker',
    value: 'Joker',
    color: 'black',
    rank: 15
  }
];
