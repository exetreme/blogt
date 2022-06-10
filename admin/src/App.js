import React from "react";
import { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import UpdatePost from "./components/UpdatePost";
import CreatePost from "./components/CreatePost";
import Narbar from "./components/Narbar";
import SearchForm from "./components/SearchForm";

export default function App() {
  const [closeNav, setCloseNav] = useState(false);
  const toggleNav = () => {
    setCloseNav(!closeNav);
  };
  const getNavWidth = () => (closeNav ? "w-16" : "w-56");

  return (
    <div className="flex">
      {/* {nav section} */}
      <div className={getNavWidth() + " h-screen transition-width"}>
        <div className="sticky top-0">
          <Narbar closed={closeNav} />
        </div>
      </div>
      {/* {nav section} */}
      <div className="flex-1 min-h-screen bg-blue-300">
        <div className="sticky top-0">
          <div className="flex items-center p-2">
            <button onClick={toggleNav}>
              {closeNav ? (
                <AiOutlineMenuUnfold size={25} />
              ) : (
                <AiOutlineMenuFold size={25} />
              )}
            </button>
            <SearchForm />
          </div>
        </div>
        <div className="max-w-screen-lg mx-auto ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:slug" element={<UpdatePost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
