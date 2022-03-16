import React from 'react';
import './Dashboard.css'
import {useDispatch, useSelector} from "react-redux";
import LoadingComponent from "../../Components/layout/LoadingComponent";
import useFireStoreCollection from "../../Hooks/useFireStoreCollection";
import {listenToProjectsFromFireStore} from "../../firebase/fireStore/fireStoreService";
import {getAllProjectsAsync} from "../../Redux/Reducers/ProjectSliceReducer";
import ProjectList from "../../Components/ProjectList/ProjectList";

const Dashboard = () => {

    const dispatch = useDispatch();
    const {projects} = useSelector(state => state.project)
    const {loading} = useSelector(state => state.async)

    useFireStoreCollection({
        query: () => listenToProjectsFromFireStore(),
        data: retrivedProjects => dispatch(getAllProjectsAsync({projects: retrivedProjects})),
        deps: [dispatch]
    })

    if (loading) return <LoadingComponent/>


    return (
        <div>
            <h2 className={'page-title'}>DashBoard</h2>
            {projects && <ProjectList projects={projects} />}

        </div>
    );
};

export default Dashboard;