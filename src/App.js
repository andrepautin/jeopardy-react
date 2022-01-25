import './App.css';
import GameStart from './GameStart';
import GameHeader from './GameHeader';

/** App Component -> GameHeader
 *                -> GameStart
 */
function App() {
  return (
    <div>
      <GameHeader/>
      <GameStart/>
    </div>
  );
}

export default App;
