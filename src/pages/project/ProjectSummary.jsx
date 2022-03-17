import React from 'react';
import Avatar from "../../Components/Avatar/Avatar";

const ProjectSummary = ({project}) => {


    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p className="due-date">
                </p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Project assigned to:</h4>
                <div className="assigned-users">
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoUrl}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectSummary;
