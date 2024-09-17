import React, { useState } from "react";
import './style/userdash.css'
import Header from "../header";
import Footer from "../footer";
import userlogo from './img/user.png'
import Card from "./component/card";
import axios from "axios";


const UserDash = () => {
    async function User_dash_data() {
        try {
            const API_BASE_URL =
                process.env.NODE_ENV === "development"
                    ? "http://localhost:5002"
                    : "https://4rzf4x59sk.execute-api.eu-north-1.amazonaws.com/dev";

            const apiUrl = `${API_BASE_URL}`;
            const response = await fetch(`${apiUrl}/api/users`)
            const user_data = response.json()
            console.log(user_data)
            return user_data
        }

        catch (error) {
            console.log(error)
        }
    }

    User_dash_data()

    const [showMore, setShowMore] = useState(false)
    const showMoreReset = () => {
        setShowMore((preState) => !preState)
    }
    return (
        <>
            <Header />
            <div className="">
                <div className="mt-12 ml-7 flex flex-col items-center justify-center">
                    <h1 className="text-black text-3xl text-center lg:text-center">
                        $Name, Welcome to <b>Play2earn</b>.
                    </h1>
                    <h4 className="text-black text-center lg:text-center mt-2">
                        Are you ready to earn cryptocurrency tokens by completing tasks?
                    </h4>
                </div>

                <div className="main_body_usd mt-7">
                    <div className="w-full lg:w-4/5 pl-4 lg:mx-auto flex flex-col lg:flex-row justify-center lg:justify-between">

                        {/* Left Sidebar */}
                        <div className="w-full lg:w-1/4 mb-6 lg:mr-10 lg:mb-0">

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
                                <div className="flex flex-wrap justify-center ">
                                    <Card />
                                    <Card />

                                    {showMore ? (
                                        <>
                                            <Card />
                                            <Card />
                                            <Card />
                                            <Card />
                                        </>) : null}

                                </div>
                                <a className="cursor-pointer px-4 py-2  text-white rounded-3xl bg-blue-500 hover:bg-blue-700 " onClick={() => showMoreReset()} >Show {showMore ? ("Less-") : "More+"}</a>
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


            </div>
            <Footer />
        </>
    )
}

export default UserDash;