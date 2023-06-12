import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Result = ({ result, notify }) => {
  const [shortURL, setShortURL] = useState('');
  const shortURLinput = useRef();

  useEffect(() => {
    setShortURL(result);
    // eslint-disable-next-line
  }, [result]);

  const copyToClipboard = () => {
    const el = shortURLinput.current;
    el.select();
    try {
      navigator.clipboard.writeText(el.value);
      notify('Copied to Clipboard');
    } catch (err) {
      console.log('Failed to copy text: ', err);
    }
  };


  if (shortURL === '') {
    return null;
  }

  return (
    <>
      <div className="inpt">
        <div className="input-field">
          <i className="material-icons prefix"></i>
          <label className="active" htmlFor="icon_prefix">
            Shortened URL
          </label>
          <input
            id="short"
            ref={shortURLinput}
            type="url"
            value={shortURL}
            readOnly
          />
          
        </div>
      </div>
      <div className="clipb">
        <div className="input-field center">
          <button className="btn waves-effect waves-light" onClick={copyToClipboard}>
            Copy to Clipboard
            <i className="material-icons right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

Result.propTypes = {
  result: PropTypes.string.isRequired,
  notify: PropTypes.func.isRequired
};

export default Result;
