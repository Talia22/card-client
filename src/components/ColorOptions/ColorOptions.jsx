import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import Styles from './ColorOptions.module.css';

const colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8']; ///

const ColorOptions = ({ onColorChange }) => {
    return (
        (
            <div className={Styles.colorOptions}>
                {colors.map((colorOption) => (
                    <div
                        key={colorOption}
                        className={`${Styles.colorCircle} ${Styles[colorOption]}`}
                        onClick={() => {
                            onColorChange(colorOption);
                        }}
                        title={colorOption.replace('color', 'Color ')}
                    >
                        <FaPaintBrush />
                    </div>
                ))}
            </div>
        )
    );
};

export default ColorOptions;
