import LadingPage from "./components/Dashboard/LadingPage";
import Home from "./components/home/Home";
import "./styles.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LadingPage/>}/>
        <Route path="/view" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
