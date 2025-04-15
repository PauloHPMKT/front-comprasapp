import { InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FieldError } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  hasError?: FieldError | undefined;
  customStyle?: string;
}

export function BaseInput({
  placeholder,
  type = 'text',
  hasError,
  customStyle,
  ...props
}: BaseInputProps) {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType((prevType: string) => (prevType === 'password'
      ? 'text'
      : 'password'
    ));
  }

  const showToggleIcon = type === 'password'

  return (
    <div
      className={twMerge(
        `flex mt-4 h-11
          rounded-lg px-2
          border-1 border-gray-400
          items-center justify-between
          ${hasError ? 'border-2 border-red-500' : ''}
        `,
        customStyle
      )}
    >
      <input
        type={inputType}
        placeholder={placeholder}
        className={
          `w-full h- rounded-lg border-none outline-none ${
            showToggleIcon ? 'pr-10' : ''
          }`
        }
        {...props}
      />
      {showToggleIcon && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
        >
          { inputType === 'password' ? <FaRegEyeSlash color="#333" /> : <FaRegEye color="#333" /> }
        </button>
      )}
    </div>
  )
}