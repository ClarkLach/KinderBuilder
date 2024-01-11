import CreatableSelect from 'react-select/creatable';
import "./search.css";

function Search({words, onChange}) {
  const arrayElements = words.map((opt) => ({ label: opt, value: opt }));

  // Probably can get rid of ./search.css but that's for later
  const customStyles = {
    option: (defaultStyles) => ({
      ...defaultStyles,
      textAlign: "center",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      padding: "10px",
      border: "2px solid #fff",
      boxShadow: "5px 5px 5px rgba(0,0,0,0.3)",
    })
  };

  // Throws an error but still works so I'll fix later
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
        styles={customStyles}
        options={arrayElements}
        onChange={opt => handleChange(opt.value, opt.actionMeta)}
        formatCreateLabel={userInput => ("Add " + userInput)}
      />
    </div>
  );
}

export default Search;
