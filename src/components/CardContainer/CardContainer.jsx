import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import Styles from './CardContainer.module.css';
import { FaPlus } from 'react-icons/fa';
import { fetchCards, addCard, updateCard, deleteCard } from '../../services/Service';



const CardContainer = () => {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');


    useEffect(() => {
        const loadCards = async () => {
            try {
                const response = await fetchCards();
                setCards(response);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        loadCards();
    }, []);

    const handleUpdateCard = async (id, newData) => {
        try {
            const response = await updateCard(id, newData);
            setCards(cards.map(card => (card.id === id ? response : card)));
        } catch (error) {
            console.error('Error updating card:', error);
        }
    };

    const handleAddCard = async () => {
        setSearch('');
        const newCard = { text: 'Enter text', backgroundColor: 'color1', isPinned: false };
        try {
            const response = await addCard(newCard);
            setCards([...cards, response]);
        } catch (error) {
            console.error('Error adding card:', error);
        }
    };

    const handleDeleteCard = async (id) => {
        try {
            await deleteCard(id);
            setCards(cards.filter(card => card.id !== id));
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    const handlePinToggle = async (id) => {
        const updatedCard = cards.find(card => card.id === id);
        const updatedData = { ...updatedCard, isPinned: !updatedCard.isPinned };

        handleUpdateCard(id, updatedData)
    };

    const filteredCards = cards.filter(card =>
        card.text.toLowerCase().includes(search.toLowerCase())
    );

    const sortedCards = [...filteredCards].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));


    return (
        <div className={Styles.container}>
            <h1>Card Container</h1>
            <input
                type="text"
                placeholder="Search cards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={Styles.searchBar}
            />
            <div className={Styles.cardContainer}>
                {sortedCards.map(card => (
                    <Card key={card.id}
                        id={card.id}
                        originText={card.text}
                        origonColor={card.backgroundColor}
                        onUpdate={handleUpdateCard}
                        onDelete={() => handleDeleteCard(card.id)}
                        onPinToggle={handlePinToggle}
                        isPinned={card.isPinned}
                    />
                ))}
                <div className={Styles.addCardButton} onClick={handleAddCard}>
                    <FaPlus />
                </div>
            </div>
        </div>
    );
};

export default CardContainer;