import axios from 'axios';

const API_URL = 'http://localhost:8080/';

export const fetchCards = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error; 
    }
};

export const addCard = async (newCard) => {
    try {
        const response = await axios.post(API_URL, newCard);
        return response.data;
    } catch (error) {
        console.error('Error adding card:', error);
        throw error; 
    }
};

export const updateCard = async (id, updatedData) => {
    try {
        const response = await axios.patch(`${API_URL}${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating card:', error);
        throw error; 
    }
};

export const deleteCard = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting card:', error);
        throw error; 
    }
};

