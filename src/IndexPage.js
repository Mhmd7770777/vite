  // IndexPage.js
  import React from 'react';
  import useSWR from 'swr';

  const fetcher = (...args) => fetch(...args).then(res => res.json());

  function IndexPage() {
    const { data, error } = useSWR(
      'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
      fetcher
    );

    if (error) return <div>Error fetching languages!</div>;
    if (!data) return <div>Loading...</div>;
    if (!data.data || !data.data.languages) return <div>No languages available.</div>;

    return (
      <div>
        <h1>List of Languages</h1>
        <ul>
          {data.data.languages.map((language, index) => (
            <li key={index}>{language.language}</li>
          ))}
        </ul>
      </div>
    );
  }

  export default IndexPage;
