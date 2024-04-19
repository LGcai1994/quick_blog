import Articles from "./components/Articles";
import AddArticle from './components/AddArticle'
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from "./auth/Register";
import Login from "./auth/Login";
import ViewArticle from "./components/ViewArticle";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/article/:id" element={<ViewArticle />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addArticle" element={<AddArticle />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;