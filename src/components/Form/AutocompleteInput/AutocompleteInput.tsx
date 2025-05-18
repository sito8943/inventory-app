import { useTranslation } from "react-i18next";
import {
  forwardRef,
  Ref,
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
import TextInput from "../TextInput";
import Suggestions from "./Suggestions";
import { Values } from "./Values";
import { AutocompleteInputPropsType } from "./types.ts";
import { SelectInputOptionType } from "../types.ts";

/**
 *
 * @param {object} props
 * @returns
 */
const AutocompleteInput = forwardRef(function (
  props: AutocompleteInputPropsType,
  ref: Ref<HTMLInputElement>,
) {
  const { t } = useTranslation();

  const {
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

  const suggestions = useMemo(() => {
    if (!options) return [];

    return options.filter((option) => {
      const isIncluded = option.name
        .toLowerCase()
        .includes(localValue?.toLowerCase() || "");

      if (Array.isArray(value)) {
        const isSelected = value.some(
          (v: SelectInputOptionType) => v.id === option.id,
        );
        return !isSelected && isIncluded;
      }

      return isIncluded;
    });
  }, [options, localValue, value]);

  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      )
        setShowSuggestions(false);
    };
    const escapePressed = (e: any) => {
      if (e.key === "Escape") setShowSuggestions(false);
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", escapePressed);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", escapePressed);
    };
  }, []);

  const handleChange = useCallback((event: any) => {
    setLocalValue(event.target.value);
  }, []);

  const handleSuggestionClick = useCallback(
    (suggestion?: SelectInputOptionType) => {
      setLocalValue("");
      if (!suggestion) onChange([]);
      else {
        if (multiple)
          value
            ? onChange([
                ...(value as SelectInputOptionType[]),
                suggestion,
              ] as SelectInputOptionType[])
            : onChange([suggestion]);
        else onChange(suggestion);
      }
      setShowSuggestions(false);
    },
    [multiple, onChange, value],
  );

  const handleDeleteChip = useCallback(
    (index: number) => {
      const newValue = (value as SelectInputOptionType[]).filter(
        (_, i) => i !== index,
      );
      if (newValue.length) onChange(newValue);
      else onChange([]);
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
        value={
          !multiple && value
            ? (value as SelectInputOptionType).name
            : localValue
        }
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
      {multiple && Array.isArray(value) ? (
        <Values list={value} onDelete={handleDeleteChip} />
      ) : null}
    </div>
  );
});

export default AutocompleteInput;
