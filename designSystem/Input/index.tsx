import { InputHTMLAttributes, useId } from "react"

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
    const id = useId();
    const computedId =  props.id ?? id;

    return (
        <div className="relative mb-3" data-te-input-wrapper-init>
            <input {...props} id={computedId} />
            <label htmlFor={computedId}
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >Example label
            </label>
        </div>
    )
}