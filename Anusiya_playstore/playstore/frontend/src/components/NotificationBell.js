import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationBell.css";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount,   setUnreadCount]   = useState(0);
  const [showDropdown,  setShowDropdown]  = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [token]);

  const fetchNotifications = async () => {
    try {
      const res  = await fetch("http://localhost:5000/api/notifications/unread", {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.count || 0);
    } catch (e) { console.error(e); }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
        method: "PUT", headers: { Authorization: "Bearer " + token },
      });
      setNotifications(notifications.filter(n => n._id !== id));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (e) { console.error(e); }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("http://localhost:5000/api/notifications/read-all", {
        method: "PUT", headers: { Authorization: "Bearer " + token },
      });
      setNotifications([]); setUnreadCount(0); setShowDropdown(false);
    } catch (e) { console.error(e); }
  };

  const handleClick = (n) => {
    markAsRead(n._id); setShowDropdown(false);
    if (n.relatedAppId) navigate("/app/" + n.relatedAppId);
  };

  const getIcon = (type) => ({ download:"📥", review:"⭐", login:"👋", register:"🎉", admin:"🔔", update:"📢" }[type] || "🔔");

  const formatTime = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 60000);
    if (diff < 1)  return "Just now";
    if (diff < 60) return `${diff}m ago`;
    const h = Math.floor(diff / 60);
    if (h < 24)    return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  if (!token) return null;

  return (
    <div className="notification-bell-wrapper">
      <button className="notification-bell-button" onClick={() => setShowDropdown(!showDropdown)}>
        🔔
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 99 ? "99+" : unreadCount}</span>
        )}
      </button>

      {showDropdown && (
        <>
          <div className="notification-overlay" onClick={() => setShowDropdown(false)} />
          <div className="notification-dropdown">
            <div className="notification-header">
              <h6>Notifications</h6>
              {unreadCount > 0 && (
                <button className="mark-all-read-btn" onClick={markAllAsRead}>Clear All</button>
              )}
            </div>
            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="no-notifications"><p>No new notifications</p></div>
              ) : (
                notifications.map(n => (
                  <div key={n._id} className="notification-item" onClick={() => handleClick(n)}>
                    <div className="notification-icon">{getIcon(n.type)}</div>
                    <div className="notification-content">
                      <div className="notification-title">{n.title}</div>
                      <div className="notification-message">{n.message}</div>
                      <div className="notification-time">{formatTime(n.createdAt)}</div>
                    </div>
                    <button className="notification-close"
                      onClick={e => { e.stopPropagation(); markAsRead(n._id); }}>✕</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
