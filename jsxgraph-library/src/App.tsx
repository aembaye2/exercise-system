import DrawingApp from "./drawingApp";
import questionProps from "./questionProps";

function App() {
  return <DrawingApp {...questionProps} />;
}

export default App;
