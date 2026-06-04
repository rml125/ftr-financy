import styles from './Tag.module.css';

type TagColor = 'green' | 'blue' | 'purple' | 'red' | 'orange' | 'yellow' | 'gray';

interface TagProps {
  label: string;
  color?: TagColor;
}

export function Tag({ label, color = 'green' }: TagProps) {
  return (
    <span className={[styles.tag, styles[color]].join(' ')}>
      {label}
    </span>
  );
}
