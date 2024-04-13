import React from "react";

const Cards = ({ params }: { params: { id: string } }) => {
  return <div>My Card: {params.id}</div>;
};

export default Cards;
