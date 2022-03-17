import React from 'react';
import './Project.css'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import useFireStoreDocument from "../../Hooks/useFireStoreDcoument";
import {listenToProjectsFromFireStore} from "../../firebase/fireStore/fireStoreService";
import {getAllProjectsAsync, projectOperationError} from "../../Redux/Reducers/ProjectSliceReducer";
import LoadingComponent from "../../Components/layout/LoadingComponent";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";

const Project = () => {
    const {id} = useParams();
    const project = useSelector(state => state.project.projects.find(p => p.id === id));


    const dispatch = useDispatch()
    const {loading, error} = useSelector(state => state.project);

    useFireStoreDocument({
        query: () => listenToProjectsFromFireStore().doc(id),
        data: project => dispatch(getAllProjectsAsync({projects: [project]})),
        errorFunc: projectOperationError,
        deps: [id]
    })

    if (error) return <p>not found</p>

    if (loading || (!project && !error)) return <LoadingComponent/>


    return (
        <div className={'project-details'}>
            <ProjectSummary project={project}/>
             <ProjectComments project={project}/>
        </div>
    );
};

export default Project;
