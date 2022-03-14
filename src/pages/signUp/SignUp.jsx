import React from 'react';
import * as Yup from 'yup';
import {Form, Formik} from 'formik';
import "./SignUp.css"
import TextInput from "../../Components/common/TextInput";
import {Button, Header, Label} from "semantic-ui-react";
import {ImageInput} from "formik-file-and-image-input";
import ImageUpload from "../../Components/common/ImageUpload";
import {imageFormats} from "../../firebase/config";
import {useDispatch, useSelector} from "react-redux";
import {registerUserAsync} from "../../Redux/Reducers/AuthSliceReducer";

const SignUp = () => {

    //region *** dispatch and auth states***
    const dispatch = useDispatch();
    const {error, user} = useSelector(state => state.auth);
    //endregion

    const initialValues = {
        email: '',
        password: '',
        displayName: '',
        thumbnail: null
    }

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
        displayName: Yup.string().required(),
        thumbnail: Yup.mixed().required()

    })

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={async (values, {
                setSubmitting,
                setErrors
            }) => {


                await dispatch(registerUserAsync({values}));
                setSubmitting(false);




            }}>
                {({isSubmitting, dirty, isValid}) => (
                    <Form className={'auth-form'}>
                        <Header sub color={'purple'} content={'sign up'}/>
                        <TextInput name={'email'} placeholder={'Enter Email'}/>
                        <TextInput name={'password'} placeholder={'Enter Password'} type={'password'}/>
                        <TextInput name={'displayName'} placeholder={'Enter display Name'}/>
                        <br/>
                        <ImageInput name={'thumbnail'} Component={ImageUpload} validFormats={imageFormats}/>
                        <br/>
                        {error &&
                        <Label basic color={'red'} style={{marginBottom: 10}} content={error}/>}
                        <br/>
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type={'submit'}
                            fluid
                            size={'large'}
                            color={'purple'}
                            content={'Sign Up'}/>

                    </Form>
                )}

            </Formik>
        </div>
    );
};

export default SignUp;
