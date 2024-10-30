import React, { useState } from 'react';
import Styles from './Card.module.css';
import { FaPalette, FaTrash } from 'react-icons/fa';
import ColorOptions from '../ColorOptions/ColorOptions';

const Card = ({ id, originText, origonColor, onUpdate, onDelete }) => {
    const [isEditing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(originText);
    const [showColorOptions, setShowColorOptions] = useState(false);

    const handleTextClick = () => {
        if (!showColorOptions) {
            setEditing(true);
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleInterupBlur = () => {
        setEditing(false);
        onUpdate(id, { text: inputValue, backgroundColor: origonColor });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setEditing(false);
            onUpdate(id, { text: inputValue, backgroundColor: origonColor });
        }
    };

    const handleColorChange = (selectedColor) => {
        onUpdate(id, { text: inputValue, backgroundColor: selectedColor });
        setShowColorOptions(false);
    };


    return (
        <div className={`${Styles.card} ${Styles[origonColor]}`} onClick={handleTextClick}>
            <div className={Styles.header}>
                <div className={Styles.deleteIcon} onClick={onDelete}>
                    <FaTrash />
                </div>
            </div>
            <div className={Styles.textContainer}>
                {isEditing ? (
                    <textarea
                        type="text"
                        className={Styles.editableText}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleInterupBlur}
                        autoFocus
                    />
                ) : (
                    <div>
                        <p className={Styles.text}>{inputValue}</p>
                    </div>
                )}
            </div>
            <div className={Styles.colorPalette} onClick={() => setShowColorOptions(prev => !prev)}>
                <FaPalette />
            </div>
            {showColorOptions && <ColorOptions
                onColorChange={handleColorChange}
            />}
        </div>
    );
};

export default Card;
