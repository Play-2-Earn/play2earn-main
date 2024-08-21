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

const CardContainer = () => {
  const cards = [
    {
      imageSrc: "/assets/play_credits.svg",
      title: "Card 1",
      description: "This is the description for card 1."
    },
    {
      imageSrc: "/assets/play_credits.svg",
      title: "Card 2",
      description: "This is the description for card 2."
    },
    {
      imageSrc: "/assets/play_credits.svg",
      title: "Card 3",
      description: "This is the description for card 3."
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

export default CardContainer;

