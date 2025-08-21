import { Outlet } from "react-router";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

function App() {
  return (
    <div className="font-mono">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
