import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button"; // Reuse your existing Button component

const AdminPanel = () => {
  const [ownersSpots, setOwnersSpots] = useState([]);
  const [driversBookings, setDriversBookings] = useState([]);
  const [disputes, setDisputes] = useState([
    {
      id: 1,
      user: "driver1@example.com",
      issue: "Discrepancy in booking time",
      status: "Pending",
    },
    {
      id: 2,
      user: "owner1@example.com",
      issue: "Incorrect pricing listed",
      status: "Pending",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ownersResponse, driversResponse] = await Promise.all([
          axios.get("/admin/owners-spots", { withCredentials: true }),
          axios.get("/admin/drivers-bookings", { withCredentials: true }),
        ]);

        setOwnersSpots(ownersResponse.data);
        setDriversBookings(driversResponse.data);
        setError(null); // Clear previous errors
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const resolveDispute = (disputeId) => {
    setDisputes((prevDisputes) =>
      prevDisputes.map((dispute) =>
        dispute.id === disputeId
          ? { ...dispute, status: "Resolved" }
          : dispute
      )
    );
    alert(`Dispute ${disputeId} has been resolved.`);
  };

  const deleteOwnerSpot = (spotId) => {
    setOwnersSpots((prevSpots) => prevSpots.filter((spot) => spot.spot_id !== spotId));
    alert(`Spot with ID ${spotId} has been deleted.`);
  };

  const deleteDriverBooking = (bookingId) => {
    setDriversBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.booking_id !== bookingId)
    );
    alert(`Booking with ID ${bookingId} has been deleted.`);
  };

  const deleteDispute = (disputeId) => {
    setDisputes((prevDisputes) => prevDisputes.filter((dispute) => dispute.id !== disputeId));
    alert(`Dispute with ID ${disputeId} has been deleted.`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Panel</h1>

      {/* Owners Section */}
      <h2>Parking Space Owners and Their Spots</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Owner Name</th>
            <th>Email</th>
            <th>Spot Location</th>
            <th>Price per Hour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ownersSpots.map((spot) => (
            <tr key={spot.spot_id || spot.owner_id}>
              <td>{spot.owner_name}</td>
              <td>{spot.owner_email}</td>
              <td>{spot.address || "N/A"}</td>
              <td>{spot.price_per_hour || "N/A"}</td>
              <td>
                <Button
                  title="Delete"
                  customClass="btn btn-danger"
                  handleClick={() => deleteOwnerSpot(spot.spot_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Drivers Section */}
      <h2>Drivers and Their Bookings</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Driver Name</th>
            <th>Email</th>
            <th>Booking Start</th>
            <th>Booking End</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {driversBookings.map((booking) => (
            <tr key={booking.booking_id}>
              <td>{booking.driver_name}</td>
              <td>{booking.driver_email}</td>
              <td>{new Date(booking.start_time).toLocaleString()}</td>
              <td>{new Date(booking.end_time).toLocaleString()}</td>
              <td>
                <Button
                  title="Delete"
                  customClass="btn btn-danger"
                  handleClick={() => deleteDriverBooking(booking.booking_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Disputes Section */}
      <h2>Disputes</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Issue</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {disputes.map((dispute) => (
            <tr key={dispute.id}>
              <td>{dispute.id}</td>
              <td>{dispute.user}</td>
              <td>{dispute.issue}</td>
              <td>
                <span
                  className={`badge ${
                    dispute.status === "Pending"
                      ? "bg-warning text-dark"
                      : "bg-success"
                  }`}
                >
                  {dispute.status}
                </span>
              </td>
              <td>
                {dispute.status === "Pending" && (
                  <Button
                    title="Resolve"
                    customClass="btn btn-success"
                    handleClick={() => resolveDispute(dispute.id)}
                  />
                )}
             
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
