import React, { useState, useEffect } from "react";
import "./css/Leaderboard.css";
// changes made into the path for integration
// import CardContainer from './' 
import CardContainer from "./UsingPlayCredit";

const Ecosystem = () => {
  
  


  return (
    <div>
      
      <h1>The Play2Earn Ecosystem</h1>
      <h1>The Play2Earn.ai ecosystem is a dynamic environment where players, AI developers, and the <br/>  broader community interact. Here’s how it all connects</h1>
      


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
      <div className="rounded overflow-hidden shadow-lg">
        <div> 
        <img 
          className="w-full" 
          src="/assets/play2earn.svg" 
          alt="Image 1" 
        />
        <div> 
            <h1> Play2Earn Games</h1>
            <p>  The core of our ecosystem.<br/> Each game is designed to not only <br /> entertain but also gather valuable <br/> data that helps train AI models. <br /> As you play, you contribute to AI <br /> research while earning PlayCredits.</p>
        </div>
        </div>
      </div>


      <div className="rounded overflow-hidden shadow-lg">
        <div>
        <img 
          className="w-full" 
          src="/assets/play_credits.svg" 
          alt="Image 2" 
        />
        <div> 
            <h1> Play Credits</h1>
            <p> The digital currency you earn by <br /> playing games. PlayCredits<br/>  can be used within our <br/>  ecosystem or transferred to a <br /> PlayCreditCard for use <br /> in the real world.</p>
        </div>
         </div>
      </div>

      <div className="rounded overflow-hidden shadow-lg">
        <div> 
        <img 
          className="w-full" 
          src="/assets/play_credit_wallet.svg" 
          alt="Image 3" 
        />
        <div> 
            <h1> Play Credit Wallet</h1>
            <p> A secure digital wallet that <br />  stores your PlayCredits. <br />  From here, you can manage your<br/>  funds, track your earnings,<br/>  and transfer PlayCredits <br />  to your PlayCreditCard.</p>
        </div>
        </div>
      </div>
      <div className="rounded overflow-hidden shadow-lg">
        <div> </div>
        <img 
          className="w-full" 
          src="/assets/playcreditcard.svg" 
          alt="Image 4" 
        />
        <div> 
            <h1> PlayCreditCard</h1>
            <p> A physical or virtual card <br /> that lets you spend your <br /> PlayCredits anywhere <br /> Mastercard/Visa is accepted. <br />  Whether you are shopping online, <br />  dining out, or paying bills, your <br /> PlayCredits are at your disposal.</p>
        </div>
        </div>
      
    </div>

    <div className="m20" > 
    <h1> Earning Play Credits</h1>

    <CardContainer /> 
    </div>

      
    </div>


  
  




    
  );
};

export default Ecosystem;



// import React from 'react';

// const Ecosystem = () => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
//       <div className="rounded overflow-hidden shadow-lg">
//         <img 
//           className="w-full" 
//           src="https://via.placeholder.com/300x200" 
//           alt="Image 1" 
//         />
//       </div>
//       <div className="rounded overflow-hidden shadow-lg">
//         <img 
//           className="w-full" 
//           src="https://via.placeholder.com/300x200" 
//           alt="Image 2" 
//         />
//       </div>
//       <div className="rounded overflow-hidden shadow-lg">
//         <img 
//           className="w-full" 
//           src="https://via.placeholder.com/300x200" 
//           alt="Image 3" 
//         />
//       </div>
//       <div className="rounded overflow-hidden shadow-lg">
//         <img 
//           className="w-full" 
//           src="https://via.placeholder.com/300x200" 
//           alt="Image 4" 
//         />
//       </div>
//     </div>
//   );
// };

// export default Ecosystem;






