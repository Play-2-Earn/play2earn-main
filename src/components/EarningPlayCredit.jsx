import React from 'react';

const Card = ({ imageSrc, title, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={imageSrc} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

const EarningPlayCredit = () => {
  const cards = [
    {
      imageSrc: "/assets/epc1.svg",
      title: "Game Performance",
      description: "Earn PlayCredits based on your performance in our games. The better you play, the more you earn."
    },
    {
      imageSrc: "/assets/epc2.svg",
      title: "Achievements",
      description: "Unlock achievements in games to receive bonus PlayCredits."
    },
    {
      imageSrc: "/assets/epc3.svg",
      title: "AI Contributions",
      description: "Certain games allow you to earn extra PlayCredits by completing tasks that contribute to AI training, such as classifying objects, making strategic decisions, or creating content."
    }
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
      {cards.map((card, index) => (
        <Card 
          key={index}
          imageSrc={card.imageSrc}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default EarningPlayCredit;


