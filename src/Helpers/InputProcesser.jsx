import React, { useState } from 'react';

const InputProcessor = (str) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        const rawValue = e.target.value;
        const processedValue = rawValue.replace(/-/g, '').toUpperCase();
        setInputValue(processedValue);
    };

    return (
        <div>
            <label htmlFor="processedInput">{str}</label>
            <input
                type="text"
                id="processedInput"
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default InputProcessor;
