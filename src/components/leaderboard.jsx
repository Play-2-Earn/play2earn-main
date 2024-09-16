import React, { useState } from "react";
import "./css/Leaderboard.css";
import { Button } from "@/components/ui/button";
import leadlead_bod_image1 from "/assets/lead_bod_image1.png";
import leadlead_bod_image2 from "/assets/lead_bod_image2.png";
import profile_for_leaderboard from "/assets/profile_for_leaderboard.png";
import Header from "./header";
import Footer from "./footer";

/**
 * Sorts users by points in descending order and assigns ranks.
 * @param {Array} users - Array of user objects with properties `username` and `points`.
 * @returns {Array} - Array of user objects with updated `rank` based on sorted order.
 */
const getSortedUsersWithRanks = (users) => {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  return sortedUsers.map((user, index) => ({
    ...user,
    rank: index + 1,
  }));
};

// Dummy data for users
const dummyUsersData = [
  { username: "Player1", points: 5000 },
  { username: "Player2", points: 4000 },
  { username: "Player3", points: 3800 },
  { username: "Player4", points: 3600 },
  { username: "Player5", points: 3500 },
  { username: "Player6", points: 3400 },
  { username: "Player7", points: 3300 },
  { username: "Player8", points: 3200 },
  { username: "Player9", points: 3100 },
  { username: "Player10", points: 3000 },
  { username: "Player11", points: 2900 },
  { username: "Player12", points: 2800 },
  { username: "Player13", points: 2700 },
  { username: "Player14", points: 2600 },
  { username: "Player15", points: 2500 },
  { username: "Player16", points: 2400 },
  { username: "Player17", points: 2300 },
  { username: "Player18", points: 2200 },
  { username: "Player19", points: 2100 },
  { username: "Player20", points: 9000 },
];

const Leaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const sortedUsersWithRanks = getSortedUsersWithRanks(dummyUsersData);
  const totalPages = Math.ceil(sortedUsersWithRanks.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsersWithRanks.slice(indexOfFirstUser, indexOfLastUser);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <div className="leaderboard-title-container">
        <h1 className="leaderboard-title">Leaderboard</h1>
      </div>
      <div className="main-content">
        <div className="flex-container">
          <div className="title2">
            <h2>
              Earn more points to reach the top 50 on the leaderboard.
              <br />A $100 prize pool will also be shared among the top 10
            </h2>
            <div className="you-earned">
              <div className="circle-container">
                <img
                  src={profile_for_leaderboard}
                  alt="profile"
                  className="profile-image"
                />
                <div className="earned-info">
                  <h2 className="earned">You Earned:</h2>
                  <h2 className="points">30000</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="leaderboard-container">
          <div className="leaderboard">
            <table>
              <thead>
                <tr>
                  <th className="th1">Rank</th>
                  <th className="th2">Username</th>
                  <th className="th2">Points Earned</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="td1">{user.rank}</td>
                    <td className="td2">{user.username}</td>
                    <td className="td3">{user.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Leaderboard;