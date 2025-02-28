import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const [modeGame, setModeGame] = useState("8 Balls");
  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const [playersInTeam, setPlayersInTeam] = useState(1);
  const [teamStartFirst, setTeamStartFirst] = useState("A");
  const [timePerTurn, setTimePerTurn] = useState(0);
  const navigate = useNavigate();

  const handleSave = () => {
    const settingsData = {
      modeGame,
      numberOfTeams,
      playersInTeam,
      teamStartFirst,
      timePerTurn,
    };

    // Save settings data to localStorage
    localStorage.setItem("settingsData", JSON.stringify(settingsData));

    navigate(-1); // Navigate back to the previous page (WaitingRoom)
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black bg-opacity-80">
      <div className="w-80 bg-white p-4 rounded-lg shadow-lg text-center">
        <h2 className="text-black text-2xl font-bold mb-4">TABLE 1</h2>
        <label className="block text-left text-gray-700">Mode game</label>
        <select
          className="w-full p-2 mb-2 border rounded"
          value={modeGame}
          onChange={(e) => setModeGame(e.target.value)}
        >
          <option>8 Balls</option>
          <option>9 Balls</option>
        </select>
        <label className="block text-left text-gray-700">Number of teams</label>
        <select
          className="w-full p-2 mb-2 border rounded"
          value={numberOfTeams}
          onChange={(e) => setNumberOfTeams(Number(e.target.value))}
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
        {numberOfTeams > 0 && (
          <>
            <label className="block text-left text-gray-700">Players in team</label>
            <select
              className="w-full p-2 mb-2 border rounded"
              value={playersInTeam}
              onChange={(e) => setPlayersInTeam(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </>
        )}
        <label className="block text-left text-gray-700">{numberOfTeams > 0 ? "Team" : "Player"} start first</label>
        <select
          className="w-full p-2 mb-2 border rounded"
          value={teamStartFirst}
          onChange={(e) => setTeamStartFirst(e.target.value)}
        >
          <option>A</option>
          <option>B</option>
        </select>
        <label className="block text-left text-gray-700">Time per turn (second)</label>
        <input
          type="number"
          className="w-full p-2 mb-4 border rounded"
          value={timePerTurn}
          onChange={(e) => setTimePerTurn(Number(e.target.value))}
        />
        <button
          className="w-full bg-gray-700 text-white py-2 rounded-lg"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Setting;