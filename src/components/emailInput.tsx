import { ChangeEvent, useState } from 'react';

export const EmailInput = ({ value, onChange }: InputProps) => {
    const [error, setError] = useState<string>('');

    const fetchValue = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue)

        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!isEmail.test(newValue)) {
            setError('Endereço de e-mail inválido')
        } else {
            setError('')
        }
    }

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={fetchValue}
                className={`form-control ${error ? 'is-invalid' : ''}`}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}