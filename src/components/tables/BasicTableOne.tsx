import React from "react";
import Badge from "../ui/badge/Badge";

interface BilliardTable {
  id: number;
  tableNumber: string;
  status: string;
  players: {
    image: string;
    name: string;
  }[];
  gameType: string;
  duration: string;
}

interface BasicTableOneProps {
  onTableClick: (tableId: number) => void;
}

// Define the table data using the interface
const tableData: BilliardTable[] = [
  {
    id: 1,
    tableNumber: "Table 1",
    status: "Now",
    players: [
      { image: "/images/user/user-17.jpg", name: "Lindsey Curtis" },
      { image: "/images/user/user-18.jpg", name: "Kaiya George" },
    ],
    gameType: "8-Ball",
    duration: "1h 30m",
  },
  {
    id: 2,
    tableNumber: "Table 2",
    status: "Close",
    players: [
      { image: "/images/user/user-19.jpg", name: "Zain Geidt" },
      { image: "/images/user/user-20.jpg", name: "Abram Schleifer" },
    ],
    gameType: "9-Ball",
    duration: "2h 15m",
  },
  {
    id: 3,
    tableNumber: "Table 3",
    status: "Now",
    players: [
      { image: "/images/user/user-21.jpg", name: "Carla George" },
      { image: "/images/user/user-22.jpg", name: "Lindsey Curtis" },
    ],
    gameType: "Straight Pool",
    duration: "45m",
  },
  {
    id: 4,
    tableNumber: "Table 4",
    status: "Close",
    players: [
      { image: "/images/user/user-23.jpg", name: "Kaiya George" },
      { image: "/images/user/user-24.jpg", name: "Zain Geidt" },
    ],
    gameType: "8-Ball",
    duration: "1h 10m",
  },
  {
    id: 5,
    tableNumber: "Table 5",
    status: "Now",
    players: [
      { image: "/images/user/user-25.jpg", name: "Abram Schleifer" },
      { image: "/images/user/user-26.jpg", name: "Carla George" },
    ],
    gameType: "9-Ball",
    duration: "2h",
  },
];

export default function BasicTableOne({ onTableClick }: BasicTableOneProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tableData.map((table) => (
        <div
          key={table.id}
          onClick={() => onTableClick(table.id)}
          className="relative p-4 border border-gray-200 rounded-lg bg-white dark:border-white/[0.05] dark:bg-white/[0.03] flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-gray-300 dark:hover:border-white/[0.1]"
        >
          <div className="absolute top-2 right-2">
            <Badge
              size="sm"
              color={table.status === "Now" ? "success" : "error"}
            >
              {table.status}
            </Badge>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div>
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {table.tableNumber}
                </span>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {table.gameType}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                Players
              </span>
              <div className="flex -space-x-2">
                {table.players.map((player, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                  >
                    <img src={player.image} alt={player.name} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                Duration
              </span>
              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                {table.duration}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
