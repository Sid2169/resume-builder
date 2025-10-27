import { useId } from 'react'

export function TextField({
  label,
  value = '',
  onChange,
  placeholder,
  hint,
  className = '',
  type = 'text',
  ...inputProps
}) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined

  return (
    <div className={`field ${className}`.trim()}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="field__input"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={hintId}
        {...inputProps}
      />
      {hint && (
        <span className="field__hint" id={hintId}>
          {hint}
        </span>
      )}
    </div>
  )
}

export function TextAreaField({
  label,
  value = '',
  onChange,
  placeholder,
  hint,
  rows = 4,
  className = '',
}) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined

  return (
    <div className={`field ${className}`.trim()}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className="field__input field__input--area"
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={hintId}
      />
      {hint && (
        <span className="field__hint" id={hintId}>
          {hint}
        </span>
      )}
    </div>
  )
}
