interface TextAreaProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  value: string
  placeholder: string
}

export default function TextArea({
  onChange,
  value,
  placeholder,
}: TextAreaProps) {
  return (
    <textarea
      onChange={onChange}
      value={value}
      className='w-full resize-y border-2 border-gray-300 p-2'
      placeholder={placeholder}
    />
  )
}
