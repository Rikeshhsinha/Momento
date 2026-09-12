import { useState } from "react";
import Feed from "./pages/Feed.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import "./App.css";

function App() {
  const [page, setPage] = useState("feed");

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => setPage("feed")}>
          ✦ Momento
        </div>

        <div className="nav-buttons">
          <button
            className={page === "feed" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("feed")}
          >
            Home
          </button>

          <button
            className={
              page === "create" ? "nav-btn create-active" : "nav-btn create"
            }
            onClick={() => setPage("create")}
          >
            + Create Post
          </button>
        </div>
      </nav>

      {/* Pages */}
      {page === "feed" ? <Feed /> : <CreatePost />}
    </div>
  );
}

export default App;

