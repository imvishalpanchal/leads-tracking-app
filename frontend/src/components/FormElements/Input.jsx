import { forwardRef, memo } from "react";
import { getEventHandlers } from "../../utils/form";

const Input = memo(forwardRef((props, ref) => {
  const {
    name,
    label,
    error,
    type = "text",
    placeholder,
    onChange,
    onClick,
    onKeyDown,
    onPaste,
    onKeyUp,
    className = "",
    isRequired = false,
    value,
    icon,
    maxLength,
    style,
    suffix,
    prefix,
    ...rest
  } = props ?? {};

  const eventHandlers = getEventHandlers(props);

  let inputHtml = (
    <div className="form-group-custom">
      {label && (
        <label className="form-label-custom">
          {label} {isRequired && <span className="required-star">*</span>}
        </label>
      )}
      {icon && (
        <span className={`input-group-text ${error ? "error" : ""}`}>
          <i className={icon}></i>
        </span>
      )}
      <div className="pos-relative">
        <input
          ref={ref}
          type={type}
          id={name}
          name={name}
          className={`form-control ${error ? "input-error" : ""} ${prefix ? 'has-prefix' : ''} ${suffix ? 'has-suffix' : ''} ${className}`}
          placeholder={
            placeholder
              ? placeholder
              : `Type ${(label || name || "").toLowerCase()} here...`
          }
          onChange={eventHandlers.onChange}
          onClick={eventHandlers.onClick}
          onKeyDown={eventHandlers.onKeyDown}
          onPaste={eventHandlers.onPaste}
          onKeyUp={eventHandlers.onKeyUp}
          value={value}
          maxLength={maxLength}
          style={style}
          {...rest}
        />
        {prefix && (
          <div className="input-prefix-icon">
            {prefix}
          </div>
        )}
        {suffix && (
          <div className="input-suffix-icon">
            {suffix}
          </div>
        )}
      </div>
      {error && <div className="form-error-text">{error}</div>}
    </div>
  );

  return inputHtml;
})
);

Input.displayName = "Input";
export default Input;
