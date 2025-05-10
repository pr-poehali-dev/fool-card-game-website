
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import PlayingCard from "@/components/PlayingCard";
import CardBackDesign from "@/components/CardBackDesign";
import { cards } from "@/lib/cards";

const GamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Получаем параметры из Location State
  const { selectedDeck = 'classic', playersCount = '2' } = location.state || {};
  
  const [gameState, setGameState] = useState({
    deck: [],
    playerHand: [],
    computerHand: [],
    tableCards: [],
    trumpCard: null,
    currentPlayer: 'player',
  });

  // Инициализация игры
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Перемешиваем колоду
    const shuffledDeck = [...cards].sort(() => Math.random() - 0.5);
    
    // Раздаем карты
    const playerCards = shuffledDeck.slice(0, 6);
    const computerCards = shuffledDeck.slice(6, 12);
    const trumpCard = shuffledDeck[12];
    const remainingDeck = shuffledDeck.slice(13);
    
    setGameState({
      deck: remainingDeck,
      playerHand: playerCards,
      computerHand: computerCards,
      tableCards: [],
      trumpCard: trumpCard,
      currentPlayer: 'player',
    });
  };

  const handleCardClick = (card) => {
    console.log('Карта выбрана:', card);
    // Здесь будет логика хода
  };

  return (
    <div className="min-h-screen bg-emerald-800 flex flex-col">
      {/* Верхняя панель */}
      <div className="bg-emerald-900 p-4 flex justify-between items-center">
        <Button onClick={() => navigate('/')} variant="outline">
          На главную
        </Button>
        <h1 className="text-2xl font-serif text-white">Игра "Дурак"</h1>
        <Button onClick={initializeGame} variant="outline">
          Новая игра
        </Button>
      </div>
      
      {/* Игровой стол */}
      <div className="flex-1 flex flex-col p-4 relative">
        {/* Рука компьютера */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-[-25px]">
            {gameState.computerHand.map((_, index) => (
              <CardBackDesign 
                key={index}
                designType={selectedDeck}
                className="transform transition-transform"
              />
            ))}
          </div>
        </div>
        
        {/* Игровое поле */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-4">
            {gameState.tableCards.length > 0 ? (
              gameState.tableCards.map((card, index) => (
                <PlayingCard 
                  key={index}
                  card={card}
                  onClick={() => {}}
                  isActive={false}
                />
              ))
            ) : (
              <div className="w-32 h-44 border-2 border-white border-dashed flex items-center justify-center text-white opacity-50">
                Игровая зона
              </div>
            )}
          </div>
        </div>
        
        {/* Колода и козырь */}
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 flex flex-col items-center">
          {gameState.trumpCard && (
            <div className="mb-4 rotate-90 transform">
              <PlayingCard card={gameState.trumpCard} onClick={() => {}} isActive={false} />
            </div>
          )}
          
          <div className="relative">
            {gameState.deck.length > 0 && (
              <CardBackDesign designType={selectedDeck} className="relative">
                <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs px-1 rounded-bl">
                  {gameState.deck.length}
                </div>
              </CardBackDesign>
            )}
          </div>
        </div>
        
        {/* Рука игрока */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {gameState.playerHand.map((card, index) => (
              <PlayingCard 
                key={index}
                card={card}
                onClick={() => handleCardClick(card)}
                isActive={gameState.currentPlayer === 'player'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
