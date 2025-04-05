import React, { useEffect, useState } from 'react';

export default function Content() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/content')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h3>Danh sách Bài viết</h3>
      <div className="content">
        {content.map(item => (
          <div key={item.id}>
            <h4>{item.title}</h4>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
