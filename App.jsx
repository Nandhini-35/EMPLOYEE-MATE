import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ShiftForm from "./components/ShiftForm";
import ShiftList from "./components/ShiftList";
import WeekView from "./components/WeekView";

import "./App.css";

function App() {
  const navigate = useNavigate();

  const [shifts, setShifts] = useState(() => {
    const saved = localStorage.getItem("shifts");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingShift, setEditingShift] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("shifts", JSON.stringify(shifts));
  }, [shifts]);

  const addShift = (shift) => setShifts([...shifts, shift]);

  const deleteShift = (id) =>
    setShifts(shifts.filter((s) => s.id !== id));

  const updateShift = (updated) => {
    setShifts(shifts.map((s) => (s.id === updated.id ? updated : s)));
    setEditingShift(null);
  };

  const sortShifts = (list) => {
    if (sortType === "name")
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sortType === "date")
      return [...list].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    if (sortType === "shift") {
      const order = { Morning: 1, Evening: 2, Night: 3 };
      return [...list].sort((a, b) => order[a.shift] - order[b.shift]);
    }
    return list;
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <nav className="navbar">
        <h2 className="logo">SmartShift</h2>
        <div className="nav-actions">
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/checklist")}>Checklist</button>
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>

      <h2 className="dash-title">Employee Shift Scheduler</h2>

      <input
        className="search-box"
        placeholder="Search employee..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="sort-buttons">
        <button onClick={() => setSortType("name")}>Sort by Name</button>
        <button onClick={() => setSortType("date")}>Sort by Date</button>
        <button onClick={() => setSortType("shift")}>Sort by Shift</button>
      </div>

      <ShiftForm
        addShift={addShift}
        updateShift={updateShift}
        editingShift={editingShift}
      />

      <ShiftList
        shifts={sortShifts(
          shifts.filter((s) =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )}
        deleteShift={deleteShift}
        setEditingShift={setEditingShift}
      />

      <WeekView shifts={shifts} />
    </div>
  );
}

export default App;
