import React from 'react';
import './CreateProject.css'
import * as Yup from 'yup';
import {Form, Formik} from "formik";
import {Button, Header} from "semantic-ui-react";
import TextInput from "../../Components/common/TextInput";
import TextArea from "../../Components/common/TextArea";
import DateInput from "../../Components/common/DateInput";
const CreateProject = () => {

    const initalValues = {
        name:"",
        details:"",
        dueDate:"",
        category:"",
        assignUsers:[]
    }
    const validationSchema = Yup.object({
        name:Yup.string().required(),
        details:Yup.string().required(),
        category:Yup.string().required(),
        dueDate:Yup.string().required(),

    })

    return (
        <div>
         <Formik initialValues={initalValues} validationSchema={validationSchema} onSubmit={async (values,setSubmitting)=>{

         }}>

             {({isSubmitting, dirty, isValid}) => (
                 <Form className={'create-form'}>
                     <Header sub color={'purple'} content={'Create Project'}/>
                     <TextInput name={'name'} placeholder={'name of the project'}/>
                     <TextArea name={'details'} placeholder={'Enter Project Details'}/>
                     <DateInput name={'dueDate'} placeholder={'enter due date for text'}/>

                     <Button loading={isSubmitting} // this will load the screen
                             disabled={!isValid || !dirty || isSubmitting}
                             type="submit" floated={'right'} positive content={'Submit'}/>

                     />

                 </Form>

                 )}

         </Formik>
        </div>
    );
};

export default CreateProject;
