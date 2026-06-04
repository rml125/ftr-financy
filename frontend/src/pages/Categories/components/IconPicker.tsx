import { Icon, type IconName } from '../../../components/Icon/Icon'
import styles from './IconPicker.module.css'

interface IconOption {
  value: IconName
  label: string
}

interface IconPickerProps {
  options: IconOption[]
  value: string
  onChange: (value: IconName) => void
}

export function IconPicker({ options, value, onChange }: IconPickerProps) {
  return (
    <div className={styles.grid}>
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          title={option.label}
          className={[styles.button, value === option.value ? styles.active : ''].join(' ')}
          onClick={() => onChange(option.value)}
        >
          <Icon name={option.value} size={20} />
        </button>
      ))}
    </div>
  )
}
