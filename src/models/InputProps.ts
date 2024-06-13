interface InputProps {
    value: string
    onChange: (value: string) => void
    readOnly?: boolean;
}

interface StringInputProps {
    onChange: (value: string) => void
    value: string
    readOnly?: boolean;
}