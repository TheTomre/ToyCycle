import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Button
      onClick={() => setCount(c => c + 1)}
      variant="outline"
      size="default"
    >
      Clicked {count} times
    </Button>
  );
}

export default App;
