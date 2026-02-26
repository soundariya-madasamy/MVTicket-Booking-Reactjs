import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../../widgets/button/index.tsx";
import axios from "axios";
import "./home.css";

interface User {
  id: number;
  name: string;
  email: string;
}

function Home(props: any) {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState<string | null>(null);
  const isLoggedIn: boolean = false;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get<User[]>("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and Email are required.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/users", form);
      // after successful POST, fetch the updated list
      await fetchUsers();
      setForm({ name: "", email: "" });
      setError(null);
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Failed to add user. Please try again.");
    }
  };

  const goToAbout = () => {
    navigate("/about");
  };

  return (
    <div className="p-5 home-layout bg-img">
      <div className="text-content">
        <h1>Hello, {isLoggedIn ? props.name : "Guest User"}</h1>
        <Buttons
          data={{
            name: "Go To About",
            class: "btn-default btn-white",
            variant: "outlined",
          }}
          onClick={goToAbout}
        />
        <h1>User List (Mock Data)</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-5">
          <input
            className="border rounded px-3 py-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add User
          </button>
        </form>

        <ul className="space-y-2">
          {users.map((u) => (
            <li
              key={u.id}
              className="bg-white border rounded px-4 py-2 shadow-sm"
            >
              {u.name} - {u.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
