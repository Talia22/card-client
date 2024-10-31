import React, { useState } from 'react';
import Styles from './Card.module.css';
import { FaPalette, FaTrash, FaThumbtack } from 'react-icons/fa';
import ColorOptions from '../ColorOptions/ColorOptions';
import colors from '../../lib/colors'


const Card = ({ id, originText, origonColor, onUpdate, onDelete, isPinned, onPinToggle }) => {
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
        onUpdate(id, { text: inputValue, backgroundColor: origonColor, isPinned: isPinned });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setEditing(false);
            onUpdate(id, { text: inputValue, backgroundColor: origonColor, isPinned: isPinned });
        }
    };

    const handleColorChange = (selectedColor) => {
        onUpdate(id, { text: inputValue, backgroundColor: selectedColor, isPinned: isPinned });
        setShowColorOptions(false);
    };


    return (
        <div className={Styles.card} style={{ backgroundColor: colors[origonColor] }} onClick={handleTextClick}>
            <div className={Styles.header}>
                <div className={Styles.deleteIcon} onClick={onDelete}>
                    <FaTrash />
                </div>
                <div className={Styles.pinIcon} onClick={(e) => { e.stopPropagation(); onPinToggle(id); }}>
                    <FaThumbtack className={isPinned ? Styles.pinned : Styles.unpinned} />
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
