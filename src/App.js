import React from "react";
import * as Bootstrap from "reactstrap";
import styled from "styled-components";
import { useState } from "react";

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
  width: 100%;
`;

const CardTitle = styled(Bootstrap.Container)`
  margin: auto;
  width: 100%;
  text-align: center;
  background-color: black;
  color: white;
`;

const ColoredCardTitle = styled(CardTitle)`
  background-color: #8e6e95;
  background-color: ${props => props.color};
`;

const CardRow = styled(Bootstrap.Container)`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 48px;
  border: medium 1px;
`;

const Button = styled(Bootstrap.Button)`
  width: 100%;
`;

const LeftButton = styled(Button)`
  display: ${props => (props.target === "purple" ? "none" : "block")};
`;

const RightButton = styled(Button)`
  display: ${props => (props.target === "orange" ? "none" : "block")};
`;

const CardRowItem = styled.span`
  margin: auto;
  width: 100%;
`;

function App() {
  const colors = [
    { name: "purple", value: "#8e6e95" },
    { name: "teal", value: "#39a59c" },
    { name: "dark", value: "#344759" },
    { name: "orange", value: "#e8741e" }
  ];
  const [cards, setCards] = useState([]);
  const addCard = target => {
    const body = window.prompt();
    setCards([...cards, { target, body }]);
  };
  const changeCard = (oldCard, newTarget) => {
    const newCards = cards.filter(card => card !== oldCard);
    setCards([...newCards, { body: oldCard.body, target: newTarget }]);
  };
  const filterCards = (array, color) => {
    const targetIndex = colors.indexOf(color);
    const cards = array.filter(obj => obj.target === color.name);
    return cards.map((card, i) => {
      return (
        <CardRow key={i}>
          <CardRowItem>
            <LeftButton
              target={card.target}
              onClick={() => changeCard(card, colors[targetIndex - 1].name)}
            >
              {"<"}
            </LeftButton>
          </CardRowItem>
          <CardRowItem>{card.body}</CardRowItem>
          <CardRowItem>
            <RightButton
              target={card.target}
              onClick={() => changeCard(card, colors[targetIndex + 1].name)}
            >
              {">"}
            </RightButton>
          </CardRowItem>
        </CardRow>
      );
    });
  };
  return (
    <GridContainer>
      {colors.map((color, i) => (
        <Card key={i}>
          <ColoredCardTitle color={color.value}>{color.name} Column</ColoredCardTitle>
          {filterCards(cards, color)}
          <Button onClick={() => addCard(color.name)}>Add Card</Button>
        </Card>
      ))}
    </GridContainer>
  );
}

export default App;
