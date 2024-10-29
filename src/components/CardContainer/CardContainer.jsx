import React, { useState } from 'react';
import Card from '../Card/Card'; 

const CardContainer = () => {
    const [cards, setCards] = useState([{ id: Date.now(), text: 'Card 1', color: 'color1' }]);

    const addCard = () => {
        const newCard = { id: Date.now() };
        setCards([...cards, newCard]);
    };

    const deleteCard = (id) => {
        setCards(cards.filter(card => card.id !== id)); 
    };

    return (
        <div>
            <h1>Card Container</h1>
            <button onClick={addCard}>Add Card</button>
            <div>
                {cards.map(card => (
                    <Card key={card.id} onDelete={() => deleteCard(card.id)} />
                ))}
            </div>
        </div>
    );
};

export default CardContainer;