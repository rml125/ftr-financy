import React from 'react';
import styles from './IconButton.module.css';
import { Icon, type IconName } from '../Icon/Icon';

type IconButtonVariant = 'outline' | 'danger';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  variant?: IconButtonVariant;
  size?: number;
  alt?: string;
}

export function IconButton({
  icon,
  variant = 'outline',
  size = 32,
  alt,
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <button
      className={[styles.btn, styles[variant], className].join(' ')}
      style={{ width: size, height: size }}
      aria-label={alt}
      {...props}
    >
      <Icon name={icon} size={16} className={styles.icon} />
    </button>
  );
}
