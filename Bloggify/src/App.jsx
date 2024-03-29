import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false)); //if no data is available
  }, []);
  //
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-[#f9fafb]">
      <div className="w-full block">
        <div className="text-white font-bold">Welcome to Bloggify</div>
        <Header />
        <main className="bg-background">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null; //conditional
}

export default App;
