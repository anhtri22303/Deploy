import { ArrowLeft } from "lucide-react";

interface MatchData {
  players: string;
  result: string;
  score: string;
  mode: string;
  date: string;
  isTeam?: boolean;
}

export default function MatchHistory() {
  const recentMatches: MatchData[] = [
    {
      players: "Player A\nPlayer B",
      result: "1\n0",
      score: "61\n12",
      mode: "Bida 15",
      date: "Feb 6, 2025",
    },
    {
      players: "Team A\nTeam B",
      result: "1\n0",
      score: "61\n12",
      mode: "Bida 15",
      date: "Feb 6, 2025",
      isTeam: true,
    },
    {
      players: "Player A\nPlayer B",
      result: "1\n0",
      score: "-",
      mode: "Bida 8",
      date: "Feb 6, 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-black bg-opacity-80 text-white">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/placeholder.svg?height=800&width=600')" }}
      />

      {/* Header */}
      <div className="p-4 flex items-center">
        <button className="p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-center flex-1 text-3xl font-bold tracking-wider">MATCH HISTORY</h1>
      </div>

      {/* Recent Games Section */}
      <div className="px-4 pb-6">
        <div className="bg-white bg-opacity-10 rounded-lg overflow-hidden">
          <div className="bg-[#5d2e2e] py-3 px-4 text-center font-medium text-2xl">RECENT GAMES</div>

          {/* Table Header */}
          <div className="grid grid-cols-5 text-lg font-medium py-2 px-3 border-b border-gray-700">
            <div>Players</div>
            <div className="text-center">Result</div>
            <div className="text-center">Score</div>
            <div className="text-center">Mode game</div>
            <div className="text-center">Date</div>
          </div>

          {/* Match Rows */}
          {recentMatches.map((match, index) => (
            <div
              key={index}
              className={`grid grid-cols-5 text-lg py-2 px-3 ${
                index < recentMatches.length - 1 ? "border-b border-gray-700" : ""
              }`}
            >
              <div className="whitespace-pre-line">
                {match.players.split("\n")[0]}
                <br />
                {match.players.split("\n")[1]}
                {match.isTeam && (
                  <span className="inline-block ml-2 align-middle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19 9L12 16L5 9"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
              <div className="text-center whitespace-pre-line">{match.result}</div>
              <div className="text-center whitespace-pre-line">{match.score}</div>
              <div className="text-center">{match.mode}</div>
              <div className="text-center">{match.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

