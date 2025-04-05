import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import logoImage from "../../assets/IconMenu.png";
import Squares from "../../assets/Squares.png";
import Folder from "../../assets/Folder.png";
import Groups from "../../assets/Groups.png";
import Piechart from "../../assets/Piechart.png";
import Chat from "../../assets/Chat.png";
import Code from "../../assets/Code.png";
import G from "../../assets/Group.png";

export default function Menu() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error("Invalid menu structure:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, []);

  const iconMap = {
    "Squares.png": Squares,
    "Folder.png": Folder,
    "Groups.png": Groups,
    "Piechart.png": Piechart,
    "Chat.png": Chat,
    "Code.png": Code,
  };

  return (
<div className="flex flex-col h-screen w-56 bg-white border border-gray-200 rounded-lg p-4">

    
      <div className="py-5 mb-2 text-center text-4xl font-semibold">
        <div className="flex items-center gap-2 justify-center">
          <img src={logoImage} alt="Logo" />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mb-4">
  <ul className="list-none p-0 m-0 space-y-1">
    {items.map((item) => (
      <li key={item.id}>
        <NavLink
          to={`/${item.name.toLowerCase()}`}
          className={({ isActive }) =>
            `flex items-center w-full py-2 px-3 rounded-lg text-sm transition-all duration-200 ${
              isActive || (item.name === "Dashboard" && window.location.pathname === "/")
                ? "bg-pink-600 text-white"
                : ""
            }`
          }
        >
          <img
            src={iconMap[item.icon] || iconMap.default}
            alt={item.name}
            className="mr-3 text-lg opacity-80"
          />
          <span>{item.name}</span>
        </NavLink>
      </li>
    ))}
  </ul>
</nav>

      <div className="mt-auto mb-10">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="w-full mx-auto mb-2">
            <img
              src={G}
              alt="Promotion"
              className="w-full h-50 object-contain mx-auto"
            />
          </div>
          <div className="font-semibold text-lg text-gray-900 mb-3">
            v2.0 is available
          </div>
          <button className="w-full py-2 border border-gray-300 rounded-lg bg-white text-gray-900 hover:bg-gray-100">
            Try now
          </button>
        </div>
      </div>
    </div>
  );
}
