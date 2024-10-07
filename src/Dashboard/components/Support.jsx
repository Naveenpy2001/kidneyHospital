import React, { useState, useEffect } from "react";
import axios from "axios";

import '../../css/Support.css'

function Support() {
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("low");
  const [issueDescription, setIssueDescription] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [raisedTickets, setRaisedTickets] = useState([]);
  const [loading, setLoading] = useState(true); // Loading animation state
  const [filter, setFilter] = useState("all"); // Filter for resolved/unresolved
  const [search, setSearch] = useState(""); // Search state for filtering tickets

  // Fetch raised tickets
  const fetchTickets = async () => {
    setLoading(true); // Start loading animation
    try {
      const response = await axios.get("https://hms.tsaritservices.com/support/tickets");
      setRaisedTickets(response.data.tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
    setLoading(false); // Stop loading animation
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Submit ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("https://hms.tsaritservices.com/support", {
        subject,
        priority,
        issue: issueDescription,
      });
      setStatusMessage("Ticket raised successfully. Our team will contact you shortly.");
      setSubject("");
      setPriority("low");
      setIssueDescription(""); // Clear form fields after submission
      fetchTickets(); // Fetch updated tickets
    } catch (error) {
      setStatusMessage("There was an error submitting your ticket. Please try again later.");
      console.error("Error raising ticket:", error);
    }
    setLoading(false);
  };

  // Filter tickets based on resolved/unresolved
  const filteredTickets = raisedTickets.filter((ticket) => {
    if (filter === "resolved") return ticket.status === "resolved";
    if (filter === "unresolved") return ticket.status === "unresolved";
    return true; // "all" filter
  });

  // Search tickets by description
  const searchedTickets = filteredTickets.filter((ticket) =>
    ticket.issue.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="support-container">
      <h2 className="support-title">Raise a Support Ticket</h2>
      <form onSubmit={handleSubmit} className="support-form">
        <div className="support-form-group">
          <label htmlFor="support-subject" className="support-label">
            Subject:
          </label>
          <input
            type="text"
            id="support-subject"
            className="support-input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="support-form-group">
          <label htmlFor="support-priority" className="support-label">
            Priority:
          </label>
          <select
            id="support-priority"
            className="support-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="Medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="support-form-group">
          <label htmlFor="support-issueDescription" className="support-label">
            Describe your issue:
          </label>
          <textarea
            id="support-issueDescription"
            className="support-textarea"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="support-submit-btn">Submit Ticket</button>
      </form>

      {statusMessage && <p className="support-status-message">{statusMessage}</p>}

    <br />
      <div className="support-filter-search">
        <select
          className="support-filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="resolved">Resolved</option>
          <option value="unresolved">Unresolved</option>
        </select>
        <input
          type="text"
          className="support-search-input"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2 className="support-raised-tickets-title">Raised Tickets</h2>
      {loading ? (
        <div className="support-loading">Loading tickets...</div> 
      ) : (
        <ul className="support-tickets-list">
          {searchedTickets.length > 0 ? (
            searchedTickets.map((ticket, index) => (
              <li key={index} className="support-ticket-item">
                <strong>Ticket #{ticket.id}:</strong> {ticket.subject} <br />
                Priority: {ticket.priority} <br />
                {ticket.issue}
                <p className="support-ticket-status">
                  Status: {ticket.status}
                </p>
              </li>
            ))
          ) : (
            <p className="support-no-tickets">No tickets found.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default Support;
