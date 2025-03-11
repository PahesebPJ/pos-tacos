/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useFormStatus } from "react-dom";
import { InputConfig } from "../props/propsInput";

import "../styles/Input.css";
import { useActionState } from "react";
import { propsFormState } from "../props/forms/propsFormState";

interface InputListProps {
    inputs: InputConfig[];
    translated_inputs?: string[],
    includeImageInput?: boolean;
    defaultAction?: (...args: any[]) => any,
    formClass?: string,
    inputClass?: string,
    submitButtonName?:string,
}

function Input({
    inputs, 
    formClass = "default__form", 
    inputClass = "default__input", 
    translated_inputs = [],
    defaultAction = () => { 
        console.log("yei")
        return {} as propsFormState; 
    },
    submitButtonName = "Default name" 
}: InputListProps) {
    const [state, stateAction] = useActionState<propsFormState>(defaultAction, {data: {}, errors: ""});
  return (
    <form action={stateAction} className={formClass}>
        {
            inputs.map(({id, name, placeholder, type},index) => (
                <div key={id} className="default__div__input">
                    <label htmlFor={name} className="custom-label">
                        {translated_inputs[index] ? translated_inputs[index].charAt(0).toUpperCase() + translated_inputs[index].slice(1) : name}
                    </label>
                    {name === "url" && type ? (
                        <input 
                            type="file" 
                            id={id} 
                            name={name} 
                            className={inputClass} 
                            accept="image/*"
                        />
                    ): typeof type === "string" ? (
                        <input 
                            id={id} 
                            name={name} 
                            placeholder={placeholder} 
                            className={inputClass}
                            type={type}
                        />
                    ): typeof type === "object" ?(
                        <select id={id} name={name} className={inputClass}>
                            {
                                type.options.map((option: string, index: number) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))
                            }
                        </select>
                    ): null}
                </div>
            ))
        }
        {
            (state?.errors) && (
                <p className="errorTextColor">
                    {state.errors}
                </p>
            )
        }
        <SubmitButton submitButtonName={submitButtonName}/>
    </form>
  )
}

function SubmitButton({ submitButtonName }: { submitButtonName: string }) {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            type="submit"
            className="form__button"
        >
            { submitButtonName }
        </button>
    );
}

export default Input