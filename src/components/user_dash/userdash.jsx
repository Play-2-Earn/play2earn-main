import React from "react";
import './style/userdash.css'
import Header from "../header";
import Footer from "../footer";
import userlogo from './img/user.png'
import Card from "./component/card";


const UserDash = () => {
    return (
        <>
            <Header />
            <div className="mt-12 flex flex-col lg:flex-row items-center justify-center">
                <h1 className="text-black text-3xl text-center lg:text-left">
                    $Name, Welcome to <b>Play2earn</b>.
                </h1>
                <h4 className="text-black text-center lg:text-left mt-2">
                    Are you ready to earn cryptocurrency tokens by completing tasks?
                </h4>
            </div>

            <div className="main_body_usd mt-7">
                <div className="w-full lg:w-4/5 px-4 lg:px-16 flex flex-col lg:flex-row justify-center lg:justify-between">

                    {/* Left Sidebar */}
                    <div className="w-full lg:w-1/4 mb-6 lg:mb-0">

                        {/* User Overview */}
                        <div className="border-solid border-2 border-gray-300 rounded-xl mb-6 p-4">
                            <img src={userlogo} alt="user_logo" className="w-20 lg:w-28 m-auto" />
                            <p className="text-sm text-left mt-6">Current level :</p>
                            <p className="text-sm text-left mt-3">Participating-task :</p>
                        </div>

                        {/* Earning Overview */}
                        <div className="border-solid border-2 border-gray-300 rounded-xl mb-6 p-4">
                            <h3 className="text-xl text-center">Earning Overview</h3>
                            <p className="text-sm text-left mt-6">Total-earned :</p>
                            <p className="text-sm text-left mt-3">View transactions :</p>
                        </div>

                        {/* AI Contribution */}
                        <div className="border-solid border-2 border-gray-300 rounded-xl p-4">
                            <h3 className="text-xl text-center">Ai Contribution</h3>
                            <p className="text-sm text-left mt-6">Task Completed :</p>
                            <p className="text-sm text-left mt-3">Ai model improved :</p>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full lg:w-3/4">

                        {/* Participated Tasks */}
                        <div className="border-solid border-2 border-gray-300 rounded-xl mb-6 p-4">
                            <h2 className="text-3xl mb-9 text-center">Participated Tasks</h2>
                            <div className="flex flex-wrap justify-center">
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                            </div>
                        </div>

                        {/* Upcoming Tasks */}
                        <div className="border-solid border-2 border-gray-300 rounded-xl p-4">
                            <h2 className="text-3xl mb-9 text-center">Upcoming Tasks</h2>
                            <div className="flex flex-wrap justify-center">
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <Footer />
        </>
    )
}

export default UserDash;