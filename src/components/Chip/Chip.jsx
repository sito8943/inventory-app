/**
 * Chip component
 * @param {object} props - componente props
 * @returns Chip component
 */
const Chip = (props) => {
  const { text, variant = "primary", className } = props;

  return <div className={`chip ${variant} ${className}`}>{text}</div>;
};

export default Chip
