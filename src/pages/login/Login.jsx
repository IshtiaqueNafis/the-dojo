import React from 'react';
import './Login.css'
import {Form, Formik} from "formik";
import {Button, Header} from "semantic-ui-react";
import TextInput from "../../Components/common/TextInput";
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {logInUserAsync} from "../../Redux/Reducers/AuthSliceReducer";

const Login = () => {

    //region *** dispatch & states***
    const dispatch = useDispatch()
    const {error} = useSelector(state => state.auth);
    //endregion

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema =Yup.object( {
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={async (values,{setSubmitting,setErrors}) => {
                await dispatch(logInUserAsync({email: values.email, password: values.password}));
                setSubmitting(false);



            }}>
                {({isSubmitting, dirty, isValid}) => (
                    <Form className={'auth-form'}>
                        <Header sub color={'purple'} content={'sign in'}/>
                        <TextInput name={'email'} placeholder={'Enter Email'}/>
                        <TextInput name={'password'} placeholder={'Enter Password'} type={'password'}/>

<br/>

                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type={'submit'}
                            fluid
                            size={'large'}
                            color={'purple'}
                            content={'Login'}/>

                    </Form>
                )}

            </Formik>
        </div>
    );
};

export default Login;
