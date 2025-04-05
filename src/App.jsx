
import './App.css'
import Content from './Components/Content/Content'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Menu from './Components/Menu/Menu'
//npx json-server --watch db.json --port 3001 , chạy json server 
function App() {


  return (
   
    <div className="container">
 
 
      <div className="header"><Header /></div>
      <div className="menu"><Menu /></div>
      <div className="content"><Content /></div>
      <div className="footer"><Footer /></div>
   
    </div>
  )
}

export default App
