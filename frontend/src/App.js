import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
