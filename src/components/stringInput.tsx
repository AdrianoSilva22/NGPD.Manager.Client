import { ChangeEvent, useState } from "react";

export const Input = ({ onChange, value, readOnly }: StringInputProps) => {
    const [error, setError] = useState<string>("");

    const fetchValue = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        // Permite apenas letras e números
        const isValid = /^[a-zA-Z0-9 ]*$/;
        onChange(newValue);

        if (!isValid.test(newValue)) {
            setError("Por favor, insira apenas letras e números.");
        } else {
            setError("");
        }
    };

    return (
        <div>
            <input
                type="text"
                onChange={fetchValue}
                value={value}
                readOnly={readOnly}
                className={`form-control ${error && "is-invalid"} `}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
