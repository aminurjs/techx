import { Outlet } from "react-router-dom";
import Navbar from "./components/nabvar/Navbar";
import Sidebar from "./components/nabvar/Sidebar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="drawer font-inter">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Page content here */}
        <main className="min-h-[calc(100vh-88px)]">
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          <Sidebar />
        </ul>
      </div>
    </div>
  );
}

export default App;
