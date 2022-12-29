import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getAllUsers } from "./reducers/user.js";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Questions from "./components/Question/Questions";
import AskQuestion from "./components/Question/AskQuestion";
import User from "./components/User/User";
import Tags from "./components/Tag/Tags";
import Users from "./components/User/Users";
import Loading from "./components/Utility/Loading.jsx";
import "./styles/App.scss";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/questions/:id" element={<Home />} />
          <Route path="/askquestion" element={<AskQuestion />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/users" element={<Users />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
