import type React from "react";
import Container from "./container/Container";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white flex items-center justify-center p-6">
      <Container />
    </div>
  );
};

export default App;
