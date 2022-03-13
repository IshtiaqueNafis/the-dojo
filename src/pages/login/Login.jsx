import React from 'react';
import './Login.css'
import {Form, Formik} from "formik";
import {Button, Header} from "semantic-ui-react";
import TextInput from "../../Components/common/TextInput";
import * as Yup from 'yup';

const Login = () => {


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
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => {
                console.log({values});
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
