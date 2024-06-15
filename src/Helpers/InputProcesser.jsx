import React, { useState } from 'react';

const InputProcessor = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        const rawValue = e.target.value;
        const processedValue = rawValue.replace(/-/g, '').toUpperCase();
        setInputValue(processedValue);
    };

    return (
        <input
            type="text"
            id="processedInput"
            value={inputValue}
            onChange={handleChange}
        />
    );
};

export default InputProcessor;
