import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Crown,
  Zap,
  Target,
  Swords,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./header";
import Footer from "./footer";

const dummyUsersData = [
  {
    username: "DragonSlayer",
    points: 9500,
    level: 42,
    streak: 7,
    achievements: 15,
  },
  {
    username: "PixelNinja",
    points: 9000,
    level: 40,
    streak: 5,
    achievements: 14,
  },
  {
    username: "CosmoQuest",
    points: 8800,
    level: 39,
    streak: 3,
    achievements: 13,
  },
  {
    username: "LevelUpLegend",
    points: 8600,
    level: 38,
    streak: 4,
    achievements: 12,
  },
  {
    username: "EpicGamer123",
    points: 8500,
    level: 37,
    streak: 2,
    achievements: 11,
  },
  {
    username: "QuestMaster",
    points: 8400,
    level: 36,
    streak: 6,
    achievements: 10,
  },
  {
    username: "StrategyKing",
    points: 8300,
    level: 35,
    streak: 1,
    achievements: 9,
  },
  {
    username: "PowerPlayer",
    points: 8200,
    level: 34,
    streak: 3,
    achievements: 8,
  },
  {
    username: "VictoryViper",
    points: 8100,
    level: 33,
    streak: 2,
    achievements: 7,
  },
  {
    username: "TechTitan",
    points: 8000,
    level: 32,
    streak: 4,
    achievements: 6,
  },
];

const Leaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [animatedPoints, setAnimatedPoints] = useState({});
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = dummyUsersData.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(dummyUsersData.length / usersPerPage);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    const animationIntervals = [];

    currentUsers.forEach((user) => {
      if (animatedPoints[user.username] === undefined) {
        setAnimatedPoints((prev) => ({ ...prev, [user.username]: 0 }));
        const interval = setInterval(() => {
          setAnimatedPoints((prev) => {
            if (prev[user.username] >= user.points) {
              clearInterval(interval);
              return prev;
            }
            return {
              ...prev,
              [user.username]: Math.min(
                prev[user.username] + Math.ceil(user.points / 100),
                user.points
              ),
            };
          });
        }, 20);
        animationIntervals.push(interval);
      }
    });

    return () => animationIntervals.forEach(clearInterval);
  }, [currentUsers, animatedPoints]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-blue-100 text-blue-800 overflow-hidden relative">
      {/* Header */}
      <Header />
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-200 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-6xl font-extrabold text-center mb-8 animate-pulse text-blue-600">
          Epic Gamers Arena
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white/70 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-blue-700">
              <Target className="mr-2" /> Daily Challenge
            </h2>
            <p className="text-blue-600">
              Complete 3 quests to earn bonus points!
            </p>
            <div className="mt-4 h-4 bg-blue-100 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: "66%" }}
              ></div>
            </div>
            <p className="text-right mt-2 text-blue-600">2/3 completed</p>
          </div>
          <div className="bg-white/70 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-blue-700">
              <Crown className="mr-2" /> Current Champion
            </h2>
            <p className="text-3xl font-bold text-blue-600">DragonSlayer</p>
            <p className="text-blue-500">Ruling for: 3 days</p>
          </div>
          <div className="bg-white/70 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-blue-700">
              <Swords className="mr-2" /> Next Tournament
            </h2>
            <p className="text-3xl font-bold text-green-600">2d 7h 15m</p>
            <p className="text-blue-500">Prize pool: 10,000 coins</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-700">
            Leaderboard Elite
          </h2>
          {currentUsers.map((user, index) => (
            <div
              key={user.username}
              className="mb-6 bg-blue-50 rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:rotate-1"
            >
              <div className="flex items-center justify-between p-4 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-100/50 to-blue-200/50 transform skew-x-12 -z-10"></div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-extrabold text-3xl border-4 border-blue-200 transform rotate-12">
                    {indexOfFirstUser + index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-blue-700">
                      {user.username}
                    </p>
                    <p className="text-blue-500">Level {user.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-4xl text-blue-600 animate-bounce">
                    {animatedPoints[user.username] || 0}
                  </p>
                  <p className="text-blue-500">points</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-blue-100 flex justify-between items-center">
                <div className="flex items-center">
                  <Zap className="text-yellow-500 mr-2" />
                  <span className="text-blue-600">
                    Streak: {user.streak} days
                  </span>
                </div>
                <div>
                  <span className="bg-blue-200 text-xs font-bold rounded-full px-3 py-1 text-blue-700">
                    {user.achievements} Achievements
                  </span>
                </div>
              </div>
              <div className="bg-blue-200 h-2 w-full">
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-500 h-full"
                  style={{ width: `${(user.points / 10000) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-6">
            <Button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Leaderboard;