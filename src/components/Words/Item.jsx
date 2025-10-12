import {forwardRef} from 'react';
import "./words.css";

const Item = forwardRef(({id, onWordClick, ...props}, ref) => {
  const handleClick = () => {
    // Call the provided onWordClick function when the word is clicked
    onWordClick(id);
  };

  return (
    <div {...props} ref={ref} onClick={handleClick} className="word">{id}</div>
  )
});

export default Item;