import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import MoviesInfo from "./pages/MoviesInfo";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Movies />}></Route>
          <Route path=":imdbID" element={<MoviesInfo />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;