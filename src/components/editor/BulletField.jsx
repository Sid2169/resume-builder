import { TextAreaField } from './Field'

export function BulletField({ value = [], onChange }) {
  return (
    <TextAreaField
      label="Highlights"
      value={value.join('\n')}
      onChange={(text) => onChange(text.split('\n'))}
      rows={5}
      placeholder={'Shipped a feature that improved…\nReduced…'}
    />
  )
}
