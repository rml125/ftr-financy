import styles from './ColorPicker.module.css'

interface ColorPickerProps {
  colors: string[]
  value: string
  onChange: (value: string) => void
}

export function ColorPicker({ colors, value, onChange }: ColorPickerProps) {
  return (
    <div className={styles.palette}>
      {colors.map(color => (
        <button
          key={color}
          type="button"
          className={[styles.swatch, value === color ? styles.active : ''].join(' ')}
          onClick={() => onChange(color)}
        >
          <span className={styles.inner} style={{ background: color }} />
        </button>
      ))}
    </div>
  )
}
