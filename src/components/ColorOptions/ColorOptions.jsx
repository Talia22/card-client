import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import Styles from './ColorOptions.module.css';
import colors from '../../lib/colors'

const ColorOptions = ({ onColorChange }) => {
    return (
        (
            <div className={Styles.colorOptions}>
            {Object.keys(colors).map((colorKey) => (
                <div
                    key={colorKey}
                    className={`${Styles.colorCircle} ${Styles[colorKey]}`}
                    onClick={() => {
                        onColorChange(colorKey);
                    }}
                    title={colorKey.replace('color', 'Color ')}
                    style={{ backgroundColor: colors[colorKey] }} 
                >
                    <FaPaintBrush />
                </div>
            ))}
        </div>
        )
    );
};

export default ColorOptions;
