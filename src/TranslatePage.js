// TranslatePage.js
import React, { useState } from 'react';
import axios from 'axios';

function TranslatePage() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState(null);

  const handleTranslate = async () => {
    try {
      const response = await axios.get(
        `https://google-translate1.p.rapidapi.com/language/translate/v2`,
        {
          params: {
            q: text,
            source: 'en',
            target: 'es'
          },
          headers: {
            'X-RapidAPI-Key': 'b77cc0403dmshd56eb519180ee3ep135e81jsnd98ccf1c86dc',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
          }
        }
      );
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      setError('Error translating text!');
    }
  };

  return (
    <div>
      <h1>Translation</h1>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleTranslate}>Translate</button>
      {translatedText && <div>Translated Text: {translatedText}</div>}
      {error && <div>{error}</div>}
    </div>
  );
}

export default TranslatePage;
