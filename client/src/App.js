import React, { useState } from 'react';
import axios from 'axios';

import InputURL from './components/InputURL';
import Result from './components/Result';

const App = () => {
  const [result, setResult] = useState('');

  const notify = (msg) => {
    alert(msg);
  };

  const shortenURL = async (url) => {
    try {
      const res = await axios.post('/api/shorten', {
        longURL: url,
      });
      setResult(res.data.shortURL);
    } catch (e) {
      console.log(e);
      notify('Sorry! Server Error occurred');
    }
  };

  const handleInput = (e) => {
    const { error, url, msg } = e;
    if (error) {
      setResult('');
      return notify(msg);
    }
    shortenURL(url);
  };

  return (
    <div className="container">
      <InputURL sendURL={handleInput} />
      <div className="row center">
        <Result result={result} notify={notify} />
      </div>
    </div>
  );
};

export default App;
