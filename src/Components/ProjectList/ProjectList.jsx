import React from 'react';
import "./ProjectList.css"
import {Link} from "react-router-dom";
import Avatar from "../Avatar/Avatar";

const ProjectList = ({projects}) => {
    return (
        <div className="project-list">
            {projects.length === 0 && <p>No projects yet!</p>}
            {projects.map(project => (
                <Link to={`/projects/${project.id}`} key={project.id}>
                    <h4>{project.name}</h4>
                    <p>Due by {project.dueDate.toDateString()}</p>
                    <div className="assigned-to">
                        <p><strong>Assigned to:</strong></p>
                        <ul>
                            {project.assignedUsersList.map(user => (
                                <li key={user.photoUrl}>
                                    <Avatar src={user.photoUrl} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProjectList;
