import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'; 
import image from './image.jpeg'; 

const Profile = () => {
    const facultyData = {
        name: 'Padmashree Desai',
        designation: 'Professor',
        qualification: 'Ph.D. in Computer Science',
        photoURL: image,
    };

    return (
        <div className="faculty-container">
            <h1>Faculty Profile</h1>
            <div className="faculty-info">
                <img src={facultyData.photoURL} alt="Faculty" />
                <div className="faculty-details">
                    <h2>{localStorage.getItem('name')}</h2>
                    <div>
                        <p className="designation">{facultyData.designation}</p>
                        <p className="qualification">{facultyData.qualification}</p>
                    </div>
                </div>
            </div>

            <ul className="module-links">
                <li className="module-link">
                    <Link to="/faculty-profile">
                        <button>
                            <h4>Faculty Profile</h4>
                            <p>Manages personal details and qualifications of faculty members.</p>
                        </button>
                    </Link>
                </li>

                <li className="module-link">
                    <Link to="/professional-experience">
                        <button>
                            <h4>Professional Experience</h4>
                            <p>Records and organizes the work experience of faculty members.</p>
                        </button>
                    </Link>
                </li>

                <li className="module-link">
                    <Link to="/teaching-portfolio">
                        <button>
                            <h4>Teaching Portfolio</h4>
                            <p>Provides details about courses taught by faculty members and related information.</p>
                        </button>
                    </Link>
                </li>

                <li className="module-link">
                    <Link to="/research-publications">
                        <button>
                            <h4>Research and Publications</h4>
                            <p>Manages publication registrations, student involvement, and books published by faculty members.</p>
                        </button>
                    </Link>
                </li>

                <li className="module-link">
                    <Link to="/conference-participation">
                        <button>
                            <h4>Conference Participation</h4>
                            <p>Tracks and displays details of faculty members' participation in conferences.</p>
                        </button>
                    </Link>
                </li>

                <li className="module-link">
                    <Link to="/research-funding">
                        <button>
                            <h4>Research Funding</h4>
                            <p>Manages information about funded projects undertaken by faculty members.</p>
                        </button>
                    </Link>
                </li>

                <li className="module-link">
                    <Link to="/workshop-management">
                        <button>
                            <h4>Workshop Management</h4>
                            <p>Records and organizes workshops conducted by faculty members.</p>
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Profile;