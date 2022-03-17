import React from 'react';
import './CreateProject.css'
import * as Yup from 'yup';
import {Form, Formik} from "formik";
import {Button, Header} from "semantic-ui-react";
import TextInput from "../../Components/common/TextInput";
import TextArea from "../../Components/common/TextArea";
import DateInput from "../../Components/common/DateInput";
import SelectInput from "../../Components/common/SelectInput";
import {useDispatch, useSelector} from "react-redux";
import useFireStoreCollection from "../../Hooks/useFireStoreCollection";
import {listenToUsersFromFireStore} from "../../firebase/fireStore/fireStoreService";
import {retrieveAllUsersAsync} from "../../Redux/Reducers/AuthSliceReducer";
import LoadingComponent from "../../Components/layout/LoadingComponent";
import {addProjectsAsync} from "../../Redux/Reducers/ProjectSliceReducer";

const CreateProject = () => {

    const categories = [
        {value: "development", text: "Development", key: 'development'},
        {value: "design", text: "Design", key: 'design'},
        {value: "sales", text: "Sales", key: 'sales'},
        {value: "marketing", text: "Marketing", key: 'marketing'},
    ]
    const dispatch = useDispatch();
    const {users,loading} = useSelector(state => state.auth)
    useFireStoreCollection({
        query: () => listenToUsersFromFireStore(),
        data: OnlineUsers => dispatch(retrieveAllUsersAsync({users: OnlineUsers})),
        deps: [dispatch]
    })


    const initialValues = {
        name: "",
        details: "",
        dueDate: "",
        category: "",
        assignUsers: [],
    }
    const validationSchema = Yup.object({
        name: Yup.string().required(),
        details: Yup.string().required(),
        category: Yup.string().required(),
        dueDate: Yup.string().required(),
        assignUsers: Yup.array().min(1).required(),


    })
    if (loading) return <LoadingComponent content={'loading...'}/>

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema}
                    onSubmit={async (values, {setSubmitting}) => {

                        const {name, details, category, dueDate, assignUsers} = values;

                        dispatch(addProjectsAsync({name, details, category, dueDate, assignUsers}))
                        setSubmitting(false);
                    }}>

                {({isSubmitting, dirty, isValid}) => (
                    <Form className={'create-form'}>
                        <Header sub color={'purple'} content={'Create Project'}/>
                        <TextInput name={'name'} placeholder={'name of the project'}/>
                        <TextArea name={'details'} placeholder={'Enter Project Details'}/>
                        <DateInput name={'dueDate'} placeholder={'enter due date for text'}/>
                        <SelectInput name={'category'} placeholder={'Select a category'} options={categories}/>
                        <SelectInput name={'assignUsers'} ismulti placeholder={'Assign Users'}
                                     options={users && users.map(user => ({
                                         value: user, text: user.email, key: user.id
                                     }))}/>

                        <Button loading={isSubmitting} // this will load the screen
                                disabled={!isValid || !dirty || isSubmitting}
                                color={'purple'}
                                type="submit" floated={'right'} positive content={'Submit'}/>


                    </Form>

                )}

            </Formik>
        </div>
    );
};

export default CreateProject;
