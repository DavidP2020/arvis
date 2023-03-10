import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import "./firebase";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TransactionComplete from "./components/Transaction/TransactionComplete";
import Order from "./components/Home/Order/Order";

function App() {
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (res) => {
      if (res) {
        setLogin(true);
        setLoading(false);
        return;
      }
      setLogin(false);
      setLoading(false);
    });
  }, []);

  //fungsi untuk loading
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center">
        Loading
      </div>
    );
  }
  return (
    <>
      {!isLogin ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/success-order" element={<TransactionComplete />} />
          <Route path="/order" element={<Order />} />
          <Route path="*" element={<Home />} />
        </Routes>
      )}
    </>
  );
}

export default App;
