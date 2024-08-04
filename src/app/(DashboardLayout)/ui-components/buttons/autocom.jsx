import { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';

const AutocompleteInput = ({ suggestions, onChange, onSuggestionsFetchRequested, onSuggestionsClearRequested, value, placeholder }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event, { newValue }) => {
    setInputValue(newValue);
    onChange(event, newValue);
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    onSuggestionsFetchRequested(value);
  };

  const handleSuggestionsClearRequested = () => {
    onSuggestionsClearRequested();
  };

  const getSuggestionValue = suggestion => suggestion;

  const renderSuggestion = suggestion => (
    <div className="py-2 px-4 cursor-pointer hover:bg-gray-200">
      {suggestion}
    </div>
  );

  const inputProps = {
    placeholder,
    value: inputValue,
    onChange: handleChange,
    className: "block px-0 w-full  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
  };

  return (
   
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={{
         
          suggestionsContainer: ' z-10 mt-0 w-full bg-white border border-gray-300 rounded-md shadow-lg',
          suggestionsList: 'list-none m-0 p-0 bg-white',
          suggestionHighlighted: 'bg-gray-200'
        }}
      />
     
    
  );
};

export default AutocompleteInput;
