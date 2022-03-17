import React, {useState} from 'react';
import './Dashboard.css'
import {useDispatch, useSelector} from "react-redux";
import LoadingComponent from "../../Components/layout/LoadingComponent";
import useFireStoreCollection from "../../Hooks/useFireStoreCollection";
import {listenToProjectsFromFireStore} from "../../firebase/fireStore/fireStoreService";
import {getAllProjectsAsync, projectOperationError} from "../../Redux/Reducers/ProjectSliceReducer";
import ProjectList from "../../Components/ProjectList/ProjectList";
import ProjectFilter from "./filter/ProjectFilter";

const Dashboard = () => {

    const dispatch = useDispatch();
    const {projects, loading} = useSelector(state => state.project)
    const [currentFilter, setCurrentFilter] = useState('all')

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter);
    }
    useFireStoreCollection({
        query: () => listenToProjectsFromFireStore(),
        data: retrivedProjects => dispatch(getAllProjectsAsync({projects: retrivedProjects})),
        errorFunc: projectOperationError,
        deps: [dispatch]
    })

    const filteredProjects = projects.filter((project) => {
        if (currentFilter === 'all') {
            return projects

        } else if (currentFilter === 'development' || currentFilter === 'design' || currentFilter === 'sales' || currentFilter === "marketing") {
            return project.category === currentFilter;
        }
    })

    if (loading) return <LoadingComponent/>



    return (
        <div>
            <h2 className={'page-title'}>DashBoard</h2>
            {projects && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>}
            {projects && <ProjectList projects={filteredProjects}/>}

        </div>
    );
};

export default Dashboard;