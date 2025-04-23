import React from "react";

function Suggestions(props) {
  const { suggestions } = props;
  return (
    <ul className="m-0 mt-1 p-0 z-10 bg-alt-background border-border elevated border-2 absolute w-full max-h-44 overflow-auto rounded-lg">
      {suggestions.map((suggestion, i) => (
        <li
          className={`p-2 text-white hover:bg-primary/20 ${i > 0 ? "border-t-border border-t-2" : ""}`}
          onClick={() => handleSuggestionClick(suggestion)}
          key={suggestion.id}
        >
          {suggestion.value}
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
