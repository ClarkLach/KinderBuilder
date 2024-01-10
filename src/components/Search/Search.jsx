import CreatableSelect from 'react-select/creatable';
import "./search.css";

function Search({words, onChange}) {
  const arrayElements = words.map((opt) => ({ label: opt, value: opt }));

  const handleChange = (newValue) => {
    // Handle the selected option
    onChange(newValue);

    // Clear the input value after selection
    if (actionMeta.action === 'select-option') {
      setSelectedOption(null);
    }
  };

  return (
    <div className="search">
      <CreatableSelect
        className="search-bar"
        placeholder="Type a word.."
        options={arrayElements}
        onChange={opt => handleChange(opt.value, opt.actionMeta)}
        formatCreateLabel={userInput => ("Add " + userInput)}
      />
    </div>
  );
}

export default Search;
