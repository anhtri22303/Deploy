import React from "react";


interface WaitingRoomTableProps {
  players: string[];
  onDeletePlayer: (index: number) => void;
}

const WaitingRoomTable: React.FC<WaitingRoomTableProps> = ({ players, onDeletePlayer }) => {
  return (
    <div className="bg-gray-300 p-4 rounded-b-lg">
      {players.map((player, index) => (
        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-400">
          <span className="text-black font-bold">{player}</span>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onDeletePlayer(index)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default WaitingRoomTable;