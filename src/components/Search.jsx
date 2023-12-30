import { useState, useEffect } from "react";

function Search({ cb = Function.prototype, categoryQuery = '' }) {
  const [value, setValue] = useState('');

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    cb(value);
  }

  const handleInput = (e) => {
    setValue(e.target.value);
  }

  useEffect(()=> {
    setValue(categoryQuery);
  }, [categoryQuery]);

  return <div className="row">
    <div className="input-field col s12">
      <input
        type="search"
        id="search-field"
        placeholder="search"
        onKeyDown={handleKey}
        onChange={handleInput}
        value={value}
      />
      <button
        className="btn"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  </div>
}

export { Search }