import React, { useState } from "react";
import "./Fleet.css";

const fleetData = [
  {
    vehicleId: "VH001",
    driverName: "James Mwangi",
    status: "In Transit",
  },
  {
    vehicleId: "VH002",
    driverName: "Grace Wanjiku",
    status: "Available",
  },
  {
    vehicleId: "VH003",
    driverName: "Peter Otieno",
    status: "Under Maintenance",
  },
  {
    vehicleId: "VH004",
    driverName: "Susan Achieng",
    status: "Available",
  },
  {
    vehicleId: "VH005",
    driverName: "Daniel Kiprono",
    status: "In Transit",
  },
];

function Fleet() {
  const [filter, setFilter] = useState("All");

  const filteredFleet = fleetData.filter((item) => {
    if (filter === "All") return true;
    return item.status === filter;
  });

  return (
    <div className="fleet-container">
      <h2>Fleet Monitoring</h2>
      <div className="fleet-filters">
        <button
          className={filter === "All" ? "active-filter" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={filter === "In Transit" ? "active-filter" : ""}
          onClick={() => setFilter("In Transit")}
        >
          In Transit
        </button>
        <button
          className={filter === "Available" ? "active-filter" : ""}
          onClick={() => setFilter("Available")}
        >
          Available
        </button>
        <button
          className={filter === "Under Maintenance" ? "active-filter" : ""}
          onClick={() => setFilter("Under Maintenance")}
        >
          Under Maintenance
        </button>
      </div>
      <table className="fleet-table">
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Driver Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredFleet.map((item) => (
            <tr key={item.vehicleId}>
              <td>{item.vehicleId}</td>
              <td>{item.driverName}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Fleet;
