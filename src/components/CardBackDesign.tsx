import { useState } from "react";
import { cn } from "@/lib/utils";

interface CardBackDesignProps {
  designType: string;
  className?: string;
}

const CardBackDesign = ({ designType, className }: CardBackDesignProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Разные дизайны для рубашек карт
  const renderDesign = () => {
    switch (designType) {
      case "classic":
        return (
          <div className="absolute inset-0 bg-red-600 flex items-center justify-center">
            <div className="w-4/5 h-4/5 border-4 border-white rounded-lg flex items-center justify-center">
              <div className="text-white text-5xl">♠</div>
            </div>
          </div>
        );

      case "modern":
        return (
          <div className="absolute inset-0 bg-blue-500">
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 gap-1 p-2">
              {Array(24)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-blue-400 rounded-full flex items-center justify-center"
                  >
                    {i % 4 === 0 && (
                      <span className="text-white text-xs">♦</span>
                    )}
                    {i % 4 === 1 && (
                      <span className="text-white text-xs">♠</span>
                    )}
                    {i % 4 === 2 && (
                      <span className="text-white text-xs">♥</span>
                    )}
                    {i % 4 === 3 && (
                      <span className="text-white text-xs">♣</span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        );

      case "retro":
        return (
          <div className="absolute inset-0 bg-amber-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5/6 h-5/6 border-2 border-amber-300 p-2">
                <div className="w-full h-full border-2 border-amber-300 flex items-center justify-center">
                  <div className="text-amber-300 text-2xl">♣♥♠♦</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "minimal":
      default:
        return (
          <div className="absolute inset-0 bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/2 h-1/2 rounded-full bg-gray-300 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full bg-gray-400 flex items-center justify-center">
                  <div className="text-white text-xl">♦</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        "w-24 h-36 rounded-lg shadow-md overflow-hidden relative transition-transform duration-200",
        isHovered && "transform scale-105",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderDesign()}
    </div>
  );
};

export default CardBackDesign;
