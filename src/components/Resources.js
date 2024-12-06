import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Resources.css";

function Resources() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const resources = [
    {
      category: "Советы по стрессу",
      items: [
        { title: "Техника глубокого дыхания", link: "#" },
        { title: "Медитация для новичков", link: "#" },
        { title: "Как расслабить тело за 5 минут", link: "#" },
      ],
    },
    {
      category: "Улучшение сна",
      items: [
        { title: "Как быстрее заснуть", link: "#" },
        { title: "Техника 4-7-8 для сна", link: "#" },
      ],
    },
    {
      category: "Психологические практики",
      items: [
        { title: "Ведение дневника эмоций", link: "#" },
        { title: "Метод позитивной психологии", link: "#" },
      ],
    },
  ];

  return (
    <div className="resources-container">
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
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
      <main className="resources-main">
        <h1>Ресурсы для психического здоровья</h1>
        <div className="resources-content">
          {resources.map((resource, index) => (
            <div className="resource-category" key={index}>
              <h2>{resource.category}</h2>
              <ul>
                {resource.items.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Resources;
