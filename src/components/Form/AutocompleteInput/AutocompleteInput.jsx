import { useTranslation } from "react-i18next";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// icons
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import TextInput from "../TextInput.jsx";
import Suggestions from "./Suggestions.jsx";
import { Values } from "./Values.jsx";

/**
 *
 * @param {object} props
 * @returns
 */
const AutocompleteInput = forwardRef(function (props, ref) {
  const { t } = useTranslation();

  const {
    state,
    value,
    onChange,
    options = [],
    name = "",
    id = "",
    label = "",
    containerClassName = "",
    placeholder = "",
    multiple = false,
    ...rest
  } = props;

  const [localValue, setLocalValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(
    () =>
      options
        ? options.filter((option) => {
            const isIncluded = option.value
              .toLowerCase()
              .includes(localValue?.toLowerCase());
            if (value && value.length) {
              return value?.some
                ? !value?.some((v) => v.id === option.id)
                : value?.id !== option.id;
            }
            return isIncluded;
          })
        : [],
    [options, localValue, value],
  );

  const autocompleteRef = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      )
        setShowSuggestions(false);
    };
    const escapePressed = (e) => {
      if (e.key === "Escape") setShowSuggestions(false);
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", escapePressed);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", escapePressed);
    };
  }, []);

  const handleChange = useCallback((event) => {
    setLocalValue(event.target.value);
  }, []);

  const handleSuggestionClick = useCallback(
    (suggestion = null) => {
      setLocalValue("");
      if (!suggestion) onChange(null);
      else {
        if (multiple)
          value ? onChange([...value, suggestion]) : onChange([suggestion]);
        else onChange(suggestion);
      }
      setShowSuggestions(false);
    },
    [multiple, onChange, value],
  );

  const handleDeleteChip = useCallback(
    (index) => {
      const newValue = value.filter((_, i) => i !== index);
      if (newValue.length) onChange(newValue);
      else onChange(null);
    },
    [onChange, value],
  );

  return (
    <div
      className={`relative w-full ${containerClassName}`}
      ref={autocompleteRef}
    >
      <TextInput
        name={name}
        id={id}
        value={!multiple && value ? value.value : localValue}
        onChange={handleChange}
        placeholder={placeholder}
        onFocus={() => setShowSuggestions(true)}
        label={label}
        ref={ref}
        className="!py-2"
        endAdornment={
          !multiple &&
          value && (
            <button
              type="button"
              name={t("_accessibility:buttons.cleanInput")}
              aria-label={t("_accessibility:ariaLabels.cleanInput")}
              className="icon-button absolute right-1 top-[50%] -translate-y-[50%] text-primary hover:text-red-300"
              onClick={() => handleSuggestionClick()}
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          )
        }
        {...rest}
      ></TextInput>
      {showSuggestions && (
        <Suggestions
          suggestions={suggestions}
          onOptionClick={handleSuggestionClick}
        />
      )}
      {multiple && value && value.length ? (
        <Values list={value} onDelete={handleDeleteChip} />
      ) : null}
    </div>
  );
});

export default AutocompleteInput;
