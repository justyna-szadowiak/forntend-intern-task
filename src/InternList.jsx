import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import "./InternList.css"

const InternList = () => {
    const [interns, setInterns] = useState([]);

    useEffect(() => {
        const fetchInterns = async () => {
            const response = await fetch('http://localhost:3001/interns');
            const interns = await response.json();
            setInterns(interns);
        }
        fetchInterns();
    }, []);

    return (
        <div className="participantsList">
            <h1 className="header">Participants</h1>
                {interns.map(u => (
                <div 
                    key={u.id}
                    className="participants">
                        {u.name} 
                        <div className="icon">
                            <img src={require('./img/icons/edit.png')} alt="Edit icon" className="editIcon" />
                            <NavLink to={`/interns/${u.id} `} className="editLink">Edit</NavLink>
                        </div>
                </div>))}
        </div>
    );
};

export default InternList;