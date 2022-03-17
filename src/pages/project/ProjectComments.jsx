import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import TextArea from "../../Components/common/TextArea";
import {Button, Label} from "semantic-ui-react";
import {timeStamp} from "../../firebase/config";
import {v4 as uuidv4} from 'uuid';
import {updateProjectAsync} from "../../Redux/Reducers/ProjectSliceReducer";
import Avatar from "../../Components/Avatar/Avatar";

const ProjectComments = ({project}) => {
    const dispatch = useDispatch();
    const {error, loading} = useSelector(state => state.project);
    const {user} = useSelector(state => state.auth);


    return (
        <div className={'project-comments'}>

            <Label content={'Project Comments'}/>
            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar src={comment.photoUrl} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>date here</p>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <Formik initialValues={{comment: ''}} validationSchema={Yup.object({
                comment: Yup.string().required()
            })} onSubmit={async (values, {setSubmitting, resetForm}) => {

                console.log({id: project.id})
                const commentToAdd = {
                    displayName: user.displayName,
                    photoUrl: user.profilePic,
                    content: values.comment,
                    createdAt: timeStamp.fromDate(new Date()),
                    id: uuidv4()

                }

                dispatch(updateProjectAsync({
                    id: project.id,
                    key: 'comments',
                    value: [...project.comments, commentToAdd]
                }))

                setSubmitting(false)


            }}>

                {({isSubmitting, dirty, isValid}) => (
                    <Form className={'project-comments'}>

                        <TextArea name={'comment'} placeholder={'enter a comment'}/>
                        <Button
                            className={'btn'}
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type={'submit'}
                            fluid
                            size={'large'}
                            color={'purple'}
                            content={'post comment'}/>
                    </Form>

                )}
            </Formik>

        </div>
    );
};

export default ProjectComments;
