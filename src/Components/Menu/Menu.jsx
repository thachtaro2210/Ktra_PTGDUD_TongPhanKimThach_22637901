import React, { useEffect, useState } from 'react';
export default function Menu() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/menu')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div className="menu">
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
