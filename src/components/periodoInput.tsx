import { ChangeEvent, useState } from "react";

export const PeriodoInput = ({ onChange, value }: StringInputProps) => {
    const [error, setError] = useState<string>('');

    const fetchValue = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        const isPeriodo = /^\d{4}\.[12]$/
        onChange(newValue)

        if (!isPeriodo.test(newValue)) {
            setError("Por favor, o formato é por exemplo 2020.1 ou 2020.2")
        } else {
            setError("")
        }
    }

    return (
        <div>
            <input type="text"
                onChange={fetchValue}
                value={value}
                className={`form-control ${error && 'is-invalid'} `}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
