import React, { useId } from 'react';
import styles from './Input.module.css';
import { Icon, type IconName } from '../Icon/Icon';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: IconName;
  rightElement?: React.ReactNode;
}

export function Input({
  label,
  error,
  hint,
  icon,
  rightElement,
  className = '',
  id,
  disabled,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label
          htmlFor={inputId}
          className={[styles.label, error ? styles.labelError : ''].join(' ')}
        >
          {label}
        </label>
      )}
      <div
        className={[
          styles.inputWrap,
          error ? styles.inputWrapError : '',
          disabled ? styles.inputWrapDisabled : '',
        ].join(' ')}
      >
        {icon && (
          <span className={styles.inputIcon}>
            <Icon name={icon} size={16} color="currentColor" />
          </span>
        )}
        <input
          id={inputId}
          disabled={disabled}
          className={[styles.input, className].join(' ')}
          {...props}
        />
        {rightElement && (
          <span className={styles.rightElement}>{rightElement}</span>
        )}
      </div>
      {error && <span className={styles.helper}>{error}</span>}
      {hint && !error && <span className={[styles.helper, styles.helperHint].join(' ')}>{hint}</span>}
    </div>
  );
}
