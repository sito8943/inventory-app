/**
 * Chip component
 * @param {object} props - componente props
 * @returns Chip component
 */
const Chip = (props) => {
  const { text, children, variant = "primary", className, ...rest } = props;

  return <div className={`chip ${variant} ${className}`} {...rest}>{text ?? children}</div>;
};

export default Chip
