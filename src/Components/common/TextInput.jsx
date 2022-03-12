import React from 'react';
import {useField} from "formik";
import {FormField, Label} from "semantic-ui-react";

const TextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <FormField error={meta.touched && !!meta.error}>
            {/* error={meta.touched && !!meta.error} --> meta.tpuched
        error --> error is the part FormField
        meta.touched --> checks whether or not forms has been touched or not
        !!meta.error --> error is going to be an object or a string, if there is a string in there it will be true if not will be fale.
  this error will be shown on the entire form field
        */}

            <label>{label}</label>
            <input {...field} {...props}/>
            {/*    pass in the field and props or any input needed for forms  */}
            {meta.touched && meta.error ?
                <Label basic color={'red'}>{meta.error}</Label> : null}
            {/*    This will show the error at the bottom  */}
        </FormField>
    );
};

export default TextInput;
