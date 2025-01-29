import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import { useState } from "react";
import SignUpPage from "./pages/SignUpPage";

const App = () => {

  const [searchedLocation, setSearchedLocation] = useState([]);
  const [selectedDates,setSelectedDates] = useState(
    {
      startDate: "",
      returnDate: "",
    }
  )
 
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage setSearchedLocation={setSearchedLocation} setSelectedDates={setSelectedDates}/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search"  element={<SearchPage location={searchedLocation} dates={selectedDates}/>} />
          <Route path="/signup" element={<SignUpPage />} />

        </Routes>
    </Router>
  );
};

export default App;
