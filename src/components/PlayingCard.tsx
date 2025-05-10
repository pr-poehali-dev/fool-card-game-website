import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CardType {
  suit: "hearts" | "diamonds" | "clubs" | "spades" | "joker";
  value: string;
  color: string;
}

interface PlayingCardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  isActive: boolean;
  style?: React.CSSProperties;
}

const PlayingCard = ({ card, onClick, isActive, style }: PlayingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case "hearts":
        return "♥";
      case "diamonds":
        return "♦";
      case "clubs":
        return "♣";
      case "spades":
        return "♠";
      case "joker":
        return "🃏";
      default:
        return "";
    }
  };

  const isRed = card.suit === "hearts" || card.suit === "diamonds";

  return (
    <div
      className={cn(
        "w-24 h-36 bg-white rounded-lg shadow-md border border-gray-300 relative cursor-pointer select-none transition-all duration-200",
        isActive && "hover:shadow-lg",
        isActive && isHovered && "transform -translate-y-2 scale-105",
        !isActive && "opacity-90",
      )}
      style={style}
      onClick={() => isActive && onClick(card)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {card.suit === "joker" ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">🃏</span>
        </div>
      ) : (
        <>
          {/* Левый верхний угол */}
          <div
            className={`absolute top-1 left-2 ${isRed ? "text-red-600" : "text-black"}`}
          >
            <div className="text-lg font-bold">{card.value}</div>
            <div className="text-lg leading-none">
              {getSuitSymbol(card.suit)}
            </div>
          </div>

          {/* Центральный символ */}
          <div
            className={`absolute inset-0 flex items-center justify-center ${isRed ? "text-red-600" : "text-black"}`}
          >
            <span className="text-4xl">{getSuitSymbol(card.suit)}</span>
          </div>

          {/* Правый нижний угол (перевернутый) */}
          <div
            className={`absolute bottom-1 right-2 rotate-180 ${isRed ? "text-red-600" : "text-black"}`}
          >
            <div className="text-lg font-bold">{card.value}</div>
            <div className="text-lg leading-none">
              {getSuitSymbol(card.suit)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayingCard;
