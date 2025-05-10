
import { Card } from './cards';

export interface GameState {
  deck: Card[];
  playerHand: Card[];
  computerHand: Card[];
  tableCards: Card[];
  trumpCard: Card | null;
  currentPlayer: 'player' | 'computer';
  isDefending: boolean;
}

// Функция для проверки, может ли одна карта бить другую
export const canBeat = (attackingCard: Card, defendingCard: Card, trumpSuit: string): boolean => {
  // Джокер бьет любую карту
  if (defendingCard.suit === 'joker') return true;
  if (attackingCard.suit === 'joker') return false;
  
  // Если масти одинаковые, то важен только ранг
  if (attackingCard.suit === defendingCard.suit) {
    return defendingCard.rank > attackingCard.rank;
  }
  
  // Если масти разные, то защищающаяся карта должна быть козырем
  return defendingCard.suit === trumpSuit;
};

// Функция для проверки, может ли игрок добавить карту к атаке
export const canAddToAttack = (card: Card, tableCards: Card[]): boolean => {
  if (tableCards.length === 0) return true;
  
  // Можно добавить карту, если её значение уже есть на столе
  return tableCards.some(tableCard => tableCard.value === card.value);
};

// Функция для определения возможных ходов компьютера
export const getComputerMoves = (
  computerHand: Card[], 
  tableCards: Card[], 
  trumpSuit: string, 
  isDefending: boolean
): Card[] => {
  if (isDefending) {
    // Если компьютер защищается, нужно найти карты, которыми можно отбиться
    const lastAttackCard = tableCards[tableCards.length - 1];
    return computerHand.filter(card => canBeat(lastAttackCard, card, trumpSuit));
  } else {
    // Если компьютер атакует
    if (tableCards.length === 0) {
      // Если стол пустой, можно ходить любой картой (лучше не козырем)
      const nonTrumpCards = computerHand.filter(card => card.suit !== trumpSuit);
      return nonTrumpCards.length > 0 ? nonTrumpCards : computerHand;
    } else {
      // Если на столе уже есть карты, можно добавить карту того же значения
      return computerHand.filter(card => canAddToAttack(card, tableCards));
    }
  }
};

// Функция для автоматического хода компьютера
export const makeComputerMove = (gameState: GameState): GameState => {
  const { computerHand, tableCards, trumpCard, isDefending } = gameState;
  const trumpSuit = trumpCard?.suit || '';
  
  // Получаем возможные ходы компьютера
  const possibleMoves = getComputerMoves(computerHand, tableCards, trumpSuit, isDefending);
  
  if (possibleMoves.length === 0) {
    // Если ходов нет, компьютер берет карты или пасует
    if (isDefending) {
      // Берет все карты со стола
      const newComputerHand = [...computerHand, ...tableCards];
      return {
        ...gameState,
        computerHand: newComputerHand,
        tableCards: [],
        currentPlayer: 'player',
        isDefending: false
      };
    } else {
      // Пасует (конец хода)
      return {
        ...gameState,
        currentPlayer: 'player',
        isDefending: true,
        tableCards: []
      };
    }
  }
  
  // Выбираем ход (пока просто первую подходящую карту)
  const cardToPlay = possibleMoves[0];
  
  // Удаляем карту из руки компьютера
  const newComputerHand = computerHand.filter(card => 
    card.suit !== cardToPlay.suit || card.value !== cardToPlay.value
  );
  
  // Добавляем карту на стол
  const newTableCards = [...tableCards, cardToPlay];
  
  return {
    ...gameState,
    computerHand: newComputerHand,
    tableCards: newTableCards,
    currentPlayer: isDefending ? 'computer' : 'player',
    isDefending: !isDefending
  };
};
