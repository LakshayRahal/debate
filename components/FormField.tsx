import React from 'react'
import { Controller, FieldValues,Path,Control } from 'react-hook-form'
import { FormControl,FormItem,FormMessage,FormDescription,FormLabel } from './ui/form'
import { Input } from './ui/input'
// Define a generic interface for props of FormField
interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;  
    // 👉 'control' comes from react-hook-form.
    // It manages the form state (values, errors, touched state, etc.)
    // and is required for Controller to work.

    name: Path<T>;  
    // 👉 'name' is the key of the form field.
    // Path<T> makes sure the string you pass matches a field
    // defined in your form type. (Type-safe field names)

    label: string;  
    // 👉 Text label shown above the input field.

    placeholder?: string;  
    // 👉 Optional placeholder for the input field.

    type?: 'text' | 'email' | 'password' | 'file';  
    // 👉 The type of the input. Defaults to 'text' if not provided.
}

// Reusable form field component
const FormField = <T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type = 'text'
}: FormFieldProps<T>) => (
    
    // 👉 Controller is a RHF wrapper for custom inputs.
    // It connects RHF's state (value, onChange, validation)
    // to a UI component (like your Input).
    <Controller 
        name={name}  // field name (must exist in your form type)
        control={control}  // passes form control object
        render={({ field }) => (
            // 👉 'field' contains props like value, onChange, onBlur
            // which we spread into <Input> to keep it in sync.
            
            <FormItem>
                <FormLabel className='label'>{label}</FormLabel>
                
                <FormControl>
                    {/* Input connected to RHF via {...field} */}
                    <Input 
                        placeholder={placeholder} 
                        type={type} 
                        {...field}  
                    />
                </FormControl>

                {/* 👉 Shows error message if validation fails */}
                <FormMessage />
            </FormItem>
        )}
    />
);
export default FormField