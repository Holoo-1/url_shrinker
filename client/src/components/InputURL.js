import React, { useState } from 'react';
import PropTypes from 'prop-types';

const InputURL = ({ sendURL }) => {
  const [input, setInput] = useState('');

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const checkURL = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!input) {
      sendURL({ error: 'Invalid URL', msg: 'Please enter a URL' });
    } else {
      const isValidURL = await checkURL(input);
      if (isValidURL) {
        sendURL({ error: null, url: input });
        setInput('');
      } else {
        sendURL({ error: 'Invalid URL', msg: 'Please enter a valid URL' });
      }
    }
  };

  return (
    <div className="row">
      <form onSubmit={onSubmit}>
        <div className="col">
          <h1 className="center">URL Shortener</h1>
          <div className="input-field">
            <input
              required
              type="url"
              className="validate"
              placeholder='Enter URL here'
              value={input}
              onChange={onChange}
            />
          </div>
          <div className="button">
            <button className="shorten-button" type="submit">
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

InputURL.propTypes = {
  sendURL: PropTypes.func.isRequired
};

export default InputURL;
