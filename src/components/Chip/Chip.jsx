import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Chip component
 * @param {object} props - component props
 * @returns Chip component
 */
const Chip = (props) => {
  const { text, children, icon, variant = "primary", className, onDelete, ...rest } = props;

  return (
    <div className={`chip ${variant} ${className}`} {...rest}>
      {icon ? <FontAwesomeIcon icon={icon} /> : null}
      {text ?? children}
    </div>
  );
};

export default Chip;
