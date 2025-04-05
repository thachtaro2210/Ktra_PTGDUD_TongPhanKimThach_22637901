import React,{useEffect,useState} from 'react'
import "./Header.css"
export default function Header() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/header")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    // <div>

    // <div class="header"><h2>My Header</h2></div>
    // </div>
    <header style={{ background: "#eee", padding: "1rem" }}>
      <h1>{data.title || "Đang tải..."}</h1>
      <p>{data.subtitle}</p>
    </header>
  )
}
