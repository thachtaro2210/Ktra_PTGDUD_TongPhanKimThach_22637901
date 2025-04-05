
import './App.css'
import Content from './Components/Content/Content'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Menu from './Components/Menu/Menu'

function App() {


  return (
   
    <div class="container">
 
 
      <div className="header"><Header /></div>
      <div className="menu"><Menu /></div>
      <div className="content"><Content /></div>
      <div className="footer"><Footer /></div>
   
    </div>
  )
}

export default App
