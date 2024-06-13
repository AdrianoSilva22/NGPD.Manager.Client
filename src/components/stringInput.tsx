import { ChangeEvent, useState } from "react";

export const Input = ({ onChange, value,readOnly }: StringInputProps) => {
    const [error, setError] = useState<string>('');

    const fetchValue = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        const isString = /^[a-zA-Z ]+$/
        onChange(newValue)

        if (!isString.test(newValue)) {
            setError("Por favor, insira apenas letras do alfabeto.")
        } else {
            setError("")
        }
    }

    return (
        <div>
            <input type="text"
                onChange={fetchValue}
                value={value}
                readOnly={readOnly}
                className={`form-control ${error && 'is-invalid'} `}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
