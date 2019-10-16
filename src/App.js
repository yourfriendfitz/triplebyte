import React from "react";
import * as Bootstrap from "reactstrap";
import styled from "styled-components";
import { useState, useEffect } from "react";

const GridContainer = styled(Bootstrap.Container)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 25px;
  margin: 25px;
`;

const Card = styled(Bootstrap.Container)`
  display: grid;
  text-align: center;
  grid-template-rows: 30px auto;
  height: min-content;
  margin: auto;
  width: 100%;
`;

const CardTitle = styled(Bootstrap.Container)`
  margin: auto;
  width: 100%;
  text-align: center;
  background-color: black;
  color: white;
`;

const PurpleCardTitle = styled(CardTitle)`
  background-color: #8e6e95;
`;

const TealCardTitle = styled(CardTitle)`
  background-color: #39a59c;
`;

const DarkCardTitle = styled(CardTitle)`
  background-color: #344759;
`;

const OrangeCardTitle = styled(CardTitle)`
  background-color: #e8741e;
`;

const CardRow = styled(Bootstrap.Container)`
  display: flex;
  justify-content: space-between;
`;

const Button = styled(Bootstrap.Button)`
  width: 100%;
`;

const CardControl = styled.span`
  margin: auto;
`;

function App() {
  const persistedCards = localStorage.getItem("cards");
  const targets = ["purple", "teal", "dark", "orange"];
  const [cards, setCards] = useState([]);
  const addCard = target => {
    const body = window.prompt();
    setCards([...cards, { target, body }]);
    localStorage.setItem("cards", cards);
  };
  const changeCard = (oldCard, newTarget) => {
    const newCards = cards.filter(card => card != oldCard);
    setCards([...newCards, { body: oldCard.body, target: newTarget }]);
  };
  const filterCards = (array, target) => {
    const targetIndex = targets.indexOf(target);
    const cards = array.filter(obj => obj.target === target);
    return cards.map(card => {
      return (
        <CardRow>
          {card.target === "purple" ? (
            ""
          ) : (
            <CardControl>
              <Button
                onClick={() => changeCard(card, targets[targetIndex - 1])}
              >
                {"<"}
              </Button>
            </CardControl>
          )}
          {card.body}
          {card.target === "orange" ? (
            ""
          ) : (
            <CardControl>
              <Button
                onClick={() => changeCard(card, targets[targetIndex + 1])}
              >
                {">"}
              </Button>
            </CardControl>
          )}
        </CardRow>
      );
    });
  };
  return (
    <GridContainer>
      <Card>
        <PurpleCardTitle>Column1</PurpleCardTitle>
        {filterCards(cards, "purple")}
        <Button onClick={() => addCard("purple")}>Add Card</Button>
      </Card>
      <Card>
        <TealCardTitle>Column1</TealCardTitle>
        {filterCards(cards, "teal")}
        <Button onClick={() => addCard("teal")}>Add Card</Button>
      </Card>
      <Card>
        <DarkCardTitle>Column1</DarkCardTitle>
        {filterCards(cards, "dark")}
        <Button onClick={() => addCard("dark")}>Add Card</Button>
      </Card>
      <Card>
        <OrangeCardTitle>Column1</OrangeCardTitle>
        {filterCards(cards, "orange")}
        <Button onClick={() => addCard("orange")}>Add Card</Button>
      </Card>
    </GridContainer>
  );
}

export default App;
