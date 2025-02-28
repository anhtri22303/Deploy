import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BilliardScoreboard: React.FC = () => {
  const [scores, setScores] = useState([0, 0]);
  const [scoreHistory, setScoreHistory] = useState<number[][]>([[], []]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedBalls, setSelectedBalls] = useState<number[]>([]);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [timer, setTimer] = useState(60); // Default to 60 seconds

  const navigate = useNavigate();

  const players = [
    { username: "Player 1", avatar: "/images/user/owner.jpg" },
    { username: "Player 2", avatar: "/images/user/user-01.jpg" },
  ];

  const ballColors = [
    "bg-yellow-500", // Ball 1
    "bg-blue-500",   // Ball 2
    "bg-red-500",    // Ball 3
    "bg-purple-500", // Ball 4
    "bg-orange-500", // Ball 5
    "bg-green-500",  // Ball 6
    "bg-red-800",   // Ball 7
    "bg-black",      // Ball 8
    "bg-yellow-500 bg-gradient-to-r from-white via-yellow-500 to-white", // Ball 9 (striped)
    "bg-blue-500 bg-gradient-to-r from-white via-blue-500 to-white",   // Ball 10 (striped)
    "bg-red-500 bg-gradient-to-r from-white via-red-500 to-white",    // Ball 11 (striped)
    "bg-purple-500 bg-gradient-to-r from-white via-purple-500 to-white", // Ball 12 (striped)
    "bg-orange-500 bg-gradient-to-r from-white via-orange-500 to-white", // Ball 13 (striped)
    "bg-green-500 bg-gradient-to-r from-white via-green-500 to-white",  // Ball 14 (striped)
    "bg-maroon-500 bg-gradient-to-r from-white via-maroon-500 to-white", // Ball 15 (striped)
  ];

  useEffect(() => {
    // Retrieve settings data from localStorage
    const settingsData = JSON.parse(localStorage.getItem("settingsData") || "{}");
    if (settingsData.timePerTurn) {
      setTimer(settingsData.timePerTurn);
    }
  }, []);

  useEffect(() => {
    if (selectedBalls.length === 15) {
      setIsGameEnd(true);
    }
  }, [selectedBalls]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (!isPaused && !isGameEnd) {
      timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            handleEnd();
            return 60; // Reset timer to 60 seconds (or the value from settings)
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [currentPlayer, isPaused, isGameEnd]);

  const handleUndo = () => {
    if (scoreHistory[currentPlayer].length > 0) {
      const lastScore = scoreHistory[currentPlayer].pop();
      setScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[currentPlayer] = lastScore || 0;
        return newScores;
      });
      setScoreHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory[currentPlayer] = [...scoreHistory[currentPlayer]];
        return newHistory;
      });
      setSelectedBalls((prevSelectedBalls) => {
        const newSelectedBalls = [...prevSelectedBalls];
        newSelectedBalls.pop();
        return newSelectedBalls;
      });
    }
  };

  const handleFoul = () => {
    // Implement foul functionality
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleEnd = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0));
    const settingsData = JSON.parse(localStorage.getItem("settingsData") || "{}");
    setTimer(settingsData.timePerTurn || 60); // Reset timer to the value from settings
  };

  const handleBallClick = (num: number) => {
    if (!selectedBalls.includes(num)) {
      setScoreHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory[currentPlayer] = [...scoreHistory[currentPlayer], scores[currentPlayer]];
        return newHistory;
      });
      setScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[currentPlayer] += num;
        return newScores;
      });
      setSelectedBalls((prevSelectedBalls) => [...prevSelectedBalls, num]);
    }
  };

  const handleClosePause = () => {
    setIsPaused(false);
  };

  const handleGameEnd = () => {
    setIsGameEnd(true);
    if (scores[0] > scores[1]) {
      // Handle Player 1 win
    } else if (scores[1] > scores[0]) {
      // Handle Player 2 win
    }
  };

  const handleNewGame = () => {
    setScores([0, 0]);
    setScoreHistory([[], []]);
    setSelectedBalls([]);
    setIsGameEnd(false);
    const settingsData = JSON.parse(localStorage.getItem("settingsData") || "{}");
    setTimer(settingsData.timePerTurn || 60);
  };

  const handleQuit = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 p-4">
      <div className="relative w-full max-w-4xl min-h-[400px] bg-gray-700 border-4 border-black rounded-lg p-8 pt-4 pb-0">
        {/* Player Info Boxes */}
        <div className={`absolute top-4 left-4 flex items-center space-x-2 ${currentPlayer === 0 ? 'bg-gray-800' : ''} p-2 rounded-lg`}>
          <img src={players[0].avatar} alt="Player 1 Avatar" className="w-12 h-12 rounded-full" />
          <span className="text-white">{players[0].username}</span>
        </div>
        <div className={`absolute top-4 right-4 flex items-center space-x-2 ${currentPlayer === 1 ? 'bg-gray-800' : ''} p-2 rounded-lg`}>
          <img src={players[1].avatar} alt="Player 2 Avatar" className="w-12 h-12 rounded-full" />
          <span className="text-white">{players[1].username}</span>
        </div>

        {/* Scoreboard */}
        <div className="flex justify-center items-center text-white text-lg font-bold mt-4">
          <span className="text-white text-4xl font-bold px-4">{scores[0]}</span>
          <span className="text-white text-4xl font-bold px-4"> - </span>
          <span className="text-white text-4xl font-bold px-4">{scores[1]}</span>
        </div>

        {/* Countdown Timers with Buttons */}
        <div className="flex justify-between items-center text-white text-xl font-bold mt-4">
          <button className="bg-gray-800 px-4 py-2 rounded text-xl" onClick={handleUndo}>
            UNDO
          </button>
          <div className="bg-gray-800 text-white text-xl font-bold px-4 py-2 rounded-lg">
            {timer}s
          </div>
          <button className="bg-gray-800 px-4 py-2 rounded text-xl" onClick={handlePause}>
            PAUSE
          </button>
        </div>

        {/* Billiard Balls */}
        <div className="grid grid-cols-8 gap-2 justify-center my-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num, index) => (
            <button
              key={num}
              className={`w-12 h-12 text-black text-lg flex items-center justify-center rounded-full border border-gray-600 ${ballColors[index]} ${selectedBalls.includes(num) ? 'opacity-50' : ''}`}
              onClick={() => handleBallClick(num)}
              disabled={selectedBalls.includes(num)}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center text-white">
          <button className="bg-gray-800 px-4 py-2 rounded text-xl" onClick={handleEnd}>
            END TURN
          </button>
          <button className="bg-gray-800 px-4 py-2 rounded text-xl" onClick={handleGameEnd}>
            END GAME
          </button>
        </div>
      </div>

      {/* Pause Modal */}
      {isPaused && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Pause</h2>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded"
              onClick={handleClosePause}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Game End Modal */}
      {isGameEnd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
              {scores[0] > scores[1] ? "Player 1 Win" : "Player 2 Win"}
            </h2>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded m-2"
              onClick={handleQuit}
            >
              Quit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BilliardScoreboard;
