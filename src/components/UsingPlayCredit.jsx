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

const UsingPlayCredit = () => {
  const cards = [
    {
      imageSrc: "/assets/upc1.svg",
      title: "In-Game Purchases",
      description: "Use PlayCredits to buy items, upgrades, and additional content within our games."
    },
    {
      imageSrc: "/assets/upc2.svg",
      title: "Real-World Spending",
      description: " Transfer your PlayCredits to your PlayCreditCard to spend them in the real world, just like cash or other digital currencies."
    },
    {
      imageSrc: "/assets/upc3.svg",
      title: "Crypto Conversion",
      description: " Convert your PlayCredits into other cryptocurrencies like Bitcoin, Ethereum, or stablecoins. "
    }
  ];

  return (
    <div className="flex flex-col md:flex-row  justify-center items-center mb-30 space-y-4 md:space-y-0 md:space-x-4">
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

export default UsingPlayCredit;

