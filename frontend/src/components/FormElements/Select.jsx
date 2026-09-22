import { useState, useRef, useEffect, forwardRef, memo, useCallback, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = memo(forwardRef((props, ref) => {
  const {
    name,
    label,
    error,
    options = [],
    onChange,
    className = "",
    isRequired = false,
    value,
    icon,
    placeholder = "Select an option",
    disabled = false,
    ...rest
  } = props ?? {};

  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState('down');
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = useMemo(() => options.find(opt => opt.value === value), [options, value]);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = useCallback((optValue) => {
    if (disabled) return;
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { name, value: optValue } });
    }
  }, [disabled, onChange, name]);

  const handleOpen = useCallback(() => {
    if (disabled) return;
    if (!isOpen) {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < 250 && rect.top > 250) {
          setDirection('up');
        } else {
          setDirection('down');
        }
      }
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [disabled, isOpen]);

  return (
    <div className={`form-group-custom ${className}`} ref={wrapperRef}>
      {label && (
        <label className="form-label-custom">
          {label} {isRequired && <span className="required-star">*</span>}
        </label>
      )}

      <div className="pos-relative">
        <select
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          className="hidden"
          {...rest}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
        </select>

        <div
          className={`form-control custom-select-trigger flex items-center justify-between cursor-pointer ${error ? "input-error" : ""} ${disabled ? "disabled-select" : ""}`}
          onClick={handleOpen}
        >
          <span className={!selectedOption ? "text-secondary" : "text-primary font-medium"}>
            {displayValue}
          </span>
          <ChevronDown size={16} className={`transition-transform text-secondary ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        <div className={`custom-select-dropdown direction-${direction} ${isOpen ? 'open' : ''}`}>
          {options.map((opt, index) => (
            <div
              key={index}
              className={`custom-select-option ${value === opt.value ? 'selected' : ''}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>
      {error && <div className="form-error-text">{error}</div>}
    </div>
  );
}));

Select.displayName = "Select";
export default Select;
