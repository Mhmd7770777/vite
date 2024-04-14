
import React, { useState } from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

function TranslatePage() {
  const [text, setText] = useState('');
  const { data: translatedText, error, mutate } = useSWR(
    text && `https://google-translate1.p.rapidapi.com/language/translate/v2?q=${encodeURIComponent(text)}&source=en&target=es`,
    fetcher
  );

  const handleTranslate = () => {
    mutate();
  };

  return (
    <div>
      <h1>Translation</h1>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleTranslate}>Translate</button>
      {translatedText && <div>Translated Text: {translatedText.data.translations[0].translatedText}</div>}
      {error && <div>Error translating text!</div>}
    </div>
  );
}

export default TranslatePage;
