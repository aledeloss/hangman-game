import "./App.css";
import Hangman from "./components/Hangman/Hangman";
import GameActivity from "./components/GameActivity/GameActivity";

function App() {
  return (
    <div className="App">
      <Hangman />
      <GameActivity />
    </div>
  );
}

export default App;
