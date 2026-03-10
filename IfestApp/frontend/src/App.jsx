import { useState } from "react";
import EventList from "./components/EventList";
import ParticipantsList from "./components/ParticipantsList";

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col items-center p-6 shadow-xl">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow-md"
        />
        <h1 className="text-2xl font-bold mb-8 tracking-wide text-center">
          I-Fest Admin
        </h1>

        <nav className="w-full space-y-2">
          {["Dashboard", "Events", "Participants", "Add Participant"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left p-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                  activeTab === tab
                    ? "bg-blue-500 shadow-md translate-x-1"
                    : "hover:bg-blue-600/70"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </nav>

        <div className="mt-auto text-sm text-gray-300 pt-6 border-t border-blue-600 w-full text-center">
          © 2025 I-Fest
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gradient-to-br from-gray-50 to-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-blue-800">{activeTab}</h2>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-md shadow">
            Admin Panel
          </div>
        </div>

        {/* Main Page Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 min-h-[70vh] transition-all">
          {activeTab === "Dashboard" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Welcome to I-Fest Management Dashboard 🎉
              </h3>
              <p className="text-gray-600 mb-8">
                Manage events, view participants, and handle registrations easily.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-6 rounded-lg shadow hover:scale-105 transition-transform text-center">
                  <h4 className="text-lg font-bold text-blue-700">
                    Total Events
                  </h4>
                  <p className="text-3xl font-semibold mt-2">12</p>
                </div>
                <div className="bg-green-100 p-6 rounded-lg shadow hover:scale-105 transition-transform text-center">
                  <h4 className="text-lg font-bold text-green-700">
                    Participants
                  </h4>
                  <p className="text-3xl font-semibold mt-2">56</p>
                </div>
                <div className="bg-yellow-100 p-6 rounded-lg shadow hover:scale-105 transition-transform text-center">
                  <h4 className="text-lg font-bold text-yellow-700">Upcoming</h4>
                  <p className="text-3xl font-semibold mt-2">5</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Events" && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Events</h3>
              <EventList />
            </div>
          )}

          {activeTab === "Participants" && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Participants</h3>
              <ParticipantsList />
            </div>
          )}

          {activeTab === "Add Participant" && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Add New Participant</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
                />
                <input
                  type="number"
                  placeholder="Event ID"
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Participant
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
