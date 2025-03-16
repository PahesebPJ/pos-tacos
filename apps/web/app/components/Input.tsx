/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useFormStatus } from "react-dom";
import { InputConfig } from "../props/propsInput";

import "../styles/Input.css";
import { useActionState, useState, useEffect } from "react";
import { propsFormState } from "../props/forms/propsFormState";
import Image from "next/image";

interface InputListProps {
    inputs: InputConfig[];
    translated_inputs?: string[],
    defaultAction?: (...args: any[]) => any,
    formClass?: string,
    inputClass?: string,
    submitButtonName?:string,
    id?: number | null,
    defaultValues?: string[] | null,
    previewUrl?: string | null, // New prop for previewing the image
}

function Input({
    inputs,
    translated_inputs = [], 
    formClass = "default__form", 
    inputClass = "default__input",
    defaultAction = () => { 
        console.log("yei")
        return {} as propsFormState; 
    },
    submitButtonName = "Default name",
    id = null,
    defaultValues = null,
    previewUrl = null,
}: InputListProps) {
    const [state, stateAction] = useActionState<propsFormState>(defaultAction, {data: {}, errors: ""});
    const [imagePreview, setImagePreview] = useState<string | null>(previewUrl || null);
    
    useEffect(() => {
        if (previewUrl) {
          setImagePreview(previewUrl);
        }
    }, [previewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setImagePreview(URL.createObjectURL(file)); // Create a local URL for preview
        }
    };

  return (
    <form action={stateAction} className={formClass}>
        {id != null && (
            <input 
                type="text" 
                name="id"
                defaultValue={id} 
                hidden
            />
        )}
        {previewUrl && (
            <input type="hidden" name="currentImageUrl" value={previewUrl} />
        )}
        {
            inputs.map(({id, name, placeholder, type},index) => (
                <div key={id} className="default__div__input">
                    <label htmlFor={name} className="custom-label">
                        {translated_inputs[index] ? translated_inputs[index].charAt(0).toUpperCase() + translated_inputs[index].slice(1) : name}
                    </label>
                    {name === "url" && type ? (
                        <div>
                            {/* Image preview */}
                            {imagePreview && <Image src={imagePreview} alt="Image preview" width={100} height={100} style={{ width: "100px", height: "100px", objectFit: "cover" }} />}
                            
                            {/* File input */}
                            <input 
                                type="file" 
                                id={id} 
                                name={name} 
                                className={inputClass} 
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    ): typeof type === "string" ? (
                        <input 
                            id={id} 
                            name={name} 
                            placeholder={placeholder} 
                            className={inputClass}
                            type={type}
                            defaultValue={defaultValues === null ? "" : defaultValues[index]}
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