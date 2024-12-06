import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Для боковой панели
  const [userData, setUserData] = useState({
    name: 'Омар Си',
    email: 'example@mail.com',
    age: 30,
    photo: 'https://distribution.faceit-cdn.net/images/6efc91d7-b15f-4015-919a-51069dedc40a.jpeg',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Логика сохранения данных (например, отправка на сервер)
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="profile-page-container">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <nav>
          <ul>
            <li>
              <Link to="/chat">
                {isSidebarOpen && <span className="text">Chat</span>}
              </Link>
            </li>
            <li>
              <Link to="/profile">
                {isSidebarOpen && <span className="text">Profile</span>}
              </Link>
            </li>
            <li>
              <Link to="/resources">
                {isSidebarOpen && <span className="text">Resources</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="profile-container">
        <div className="profile-header">
          <img
            src={userData.photo}
            alt="User Avatar"
            className="profile-avatar"
          />
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="profile-input"
            />
          ) : (
            <h2>{userData.name}</h2>
          )}
          <p>{userData.email}</p>
        </div>
        <div className="profile-body">
          <h3>Age:</h3>
          {isEditing ? (
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleInputChange}
              className="profile-input"
            />
          ) : (
            <p>{userData.age} years old</p>
          )}
        </div>
        <div className="profile-footer">
          <button onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing && <button onClick={handleSave}>Save</button>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
