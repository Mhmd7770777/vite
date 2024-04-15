// TranslatePage.js
import React, { useState } from 'react';
import axios from 'axios';

const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';

const headers = {
  'X-RapidAPI-Key': 'b77cc0403dmshd56eb519180ee3ep135e81jsnd98ccf1c86dc',
  'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
};

function TranslatePage() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const params = new URLSearchParams({
    q: text,
    source: 'en',
    target: 'es'
  });
  

  const handleTranslate = async () => {
    try {
      setLoading(true)
      setTranslatedText(false)
      const response = await axios.post(url, params.toString(), { headers });
      setTranslatedText(response.data.data.translations[0].translatedText);
      setError("")
    } catch (error) {
      setError('Error translating text!');
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <h1>Translation</h1>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button disabled={loading} onClick={handleTranslate}>Translate</button>
      {loading && <p>loading ...</p>}
      {translatedText && <div>Translated Text: {translatedText}</div>}
      {error && <div>{error}</div>}
    </div>
  );
}

export default TranslatePage;
