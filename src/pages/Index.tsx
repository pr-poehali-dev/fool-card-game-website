
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import CardBackDesign from '@/components/CardBackDesign';

const Index = () => {
  const [selectedDeck, setSelectedDeck] = useState("classic");
  const [playersCount, setPlayersCount] = useState("2");

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-800 to-emerald-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-amber-300 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold font-serif">Дурак</CardTitle>
            <CardDescription>Классическая карточная игра с 54 картами</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Выберите дизайн карт:</label>
              <Select value={selectedDeck} onValueChange={setSelectedDeck}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите дизайн" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">Классический</SelectItem>
                  <SelectItem value="modern">Современный</SelectItem>
                  <SelectItem value="retro">Ретро</SelectItem>
                  <SelectItem value="minimal">Минималистичный</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Количество игроков:</label>
              <Select value={playersCount} onValueChange={setPlayersCount}>
                <SelectTrigger>
                  <SelectValue placeholder="Количество игроков" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 игрока</SelectItem>
                  <SelectItem value="3">3 игрока</SelectItem>
                  <SelectItem value="4">4 игрока</SelectItem>
                  <SelectItem value="6">6 игроков</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mt-4 flex justify-center">
              <CardBackDesign designType={selectedDeck} className="hover-scale" />
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/game" className="w-full" state={{ selectedDeck, playersCount }}>
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                Начать игру
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
