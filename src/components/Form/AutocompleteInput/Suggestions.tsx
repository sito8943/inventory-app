import { SuggestionsPropsType } from "./types.ts";
import { SelectInputOptionType } from "components";

function Suggestions(props: SuggestionsPropsType) {
  const { suggestions, onOptionClick } = props;

  return (
    <ul className="m-0 mt-1 p-0 z-10 bg-alt-background border-border elevated border-2 absolute w-full max-h-44 overflow-auto rounded-lg">
      {suggestions.map((suggestion: SelectInputOptionType, i: number) => (
        <li
          className={`p-2 text-white hover:bg-primary/20 ${i > 0 ? "border-t-border border-t-2" : ""}`}
          onClick={() => onOptionClick(suggestion)}
          key={suggestion.id}
        >
          {suggestion.name}
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
