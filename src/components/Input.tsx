'use client';

import { useState, InputHTMLAttributes, ReactNode } from 'react';

// Types
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    icon?: ReactNode;
    required?: boolean;
    placeholder?: string;
}

const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    error,
    icon,
    required = false,
    placeholder = '',
    ...props
}: InputProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const hasValue = value && value.length > 0;

    return (
        <div className="input-wrapper">
            <style jsx>{`
                .input-wrapper {
                    width: 100%;
                    margin-bottom: 1rem;
                }

                .input-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: #ffffff;
                    border: 2px solid rgba(0, 46, 33, 0.1);
                    border-radius: 1rem;
                    padding: 0.75rem 1rem;
                    transition: all 0.3s;
                }

                .input-container:hover {
                    border-color: rgba(0, 46, 33, 0.2);
                }

                .input-focused {
                    border-color: #f9dc5c !important;
                    box-shadow: 0 0 0 3px rgba(249, 220, 92, 0.1);
                }

                .input-error {
                    border-color: #ef4444 !important;
                }

                .input-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(0, 46, 33, 0.5);
                    flex-shrink: 0;
                }

                .input-field {
                    position: relative;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .input-field input {
                    width: 100%;
                    border: none;
                    outline: none;
                    background: transparent;
                    font-size: 1rem;
                    font-family: 'Manrope', sans-serif;
                    color: #002e21;
                    padding-top: 0.5rem;
                }

                .input-field input::placeholder {
                    color: transparent;
                }

                .input-label {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    color: rgba(0, 46, 33, 0.5);
                    font-size: 1rem;
                    pointer-events: none;
                    transition: all 0.3s;
                    background: #ffffff;
                    padding: 0 0.25rem;
                }

                .input-label-float {
                    top: -0.5rem;
                    font-size: 0.75rem;
                    color: #002e21;
                    font-weight: 600;
                }

                .input-required {
                    color: #ef4444;
                }

                .input-error-message {
                    display: block;
                    margin-top: 0.5rem;
                    font-size: 0.875rem;
                    color: #ef4444;
                    animation: fadeIn 0.15s;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>

            <div className={`input-container ${error ? 'input-error' : ''} ${isFocused ? 'input-focused' : ''}`}>
                {icon && <span className="input-icon">{icon}</span>}
                <div className="input-field">
                    <input
                        type={type}
                        value={value}
                        onChange={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        required={required}
                        {...props}
                    />
                    <label className={`input-label ${hasValue || isFocused ? 'input-label-float' : ''}`}>
                        {label} {required && <span className="input-required">*</span>}
                    </label>
                </div>
            </div>
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
};

export default Input;
