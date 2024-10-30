import React, { useState } from 'react';
import Styles from './Card.module.css';
import { FaPaintBrush, FaTrash, FaPalette } from 'react-icons/fa'; 


const colors = ['color1', 'color2', 'color3', 'color4'];

const Card = ({id, originText, origonColor, onUpdate, onDelete }) => {
    const [color, setColor] = useState(origonColor);
    const [text, setText] = useState(originText); 
    const [isEditing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(text);
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
        setText(inputValue);
        setEditing(false);
        onUpdate(id, { text: inputValue, backgroundColor: color })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setText(inputValue);
            setEditing(false);
            onUpdate(id, { text: inputValue, backgroundColor: color })

        }
    };

    const handleColorChange = (selectedColor) => {
        setColor(selectedColor);
        setShowColorOptions(false); 
        setEditing(false);
        onUpdate(id, { text: inputValue, backgroundColor: selectedColor });

        
    };

    return (
        <div className={`${Styles.card} ${Styles[color]}`} onClick={handleTextClick}>
            <div className={Styles.header}>
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
                            <p>{text}</p>
                        </div>
                    )}
                </div>
                <div className={Styles.deleteIcon} onClick={onDelete}>
                    <FaTrash />
                </div>
            </div>
            <div className={Styles.colorPalette} onClick={() => setShowColorOptions(prev => !prev)}>
                <FaPalette />
            </div>
            {showColorOptions && (
                <div className={Styles.colorOptions}>
                    {colors.map((colorOption) => (
                        <div
                            key={colorOption}
                            className={`${Styles.colorCircle} ${Styles[colorOption]}`}
                            onClick={() => handleColorChange(colorOption)}
                            title={colorOption.replace('color', 'Color ')} 
                        >
                            <FaPaintBrush />
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Card;




