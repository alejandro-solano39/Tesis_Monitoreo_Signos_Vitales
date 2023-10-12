import React, { useState } from 'react';
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';
import { FaBell, FaBellSlash, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationMenu = styled.div`
  position: absolute;
  right: 0;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  z-index: 1000;
  width: 250px;
  max-height: 300px;
  overflow-y: auto;
`;

const NotificationItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e1e1e1;
  background-color: ${({ color }) => color || '#fff'};
  &:last-child {
    border-bottom: none;
  }
`;

const Footer = styled.div`
  padding: 10px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationCenter = () => {
  const { notifications, clear, markAllAsRead, remove } = useNotificationCenter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <div className="relative mr-4">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
        {unreadCount > 0 ? <FaBell className="text-red-500" /> : <FaBellSlash className="text-gray-400" />}
      </button>
      {isMenuOpen && (
        <NotificationMenu>
          <AnimatePresence>
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} color={notification.color}>
                <span>{notification.content}</span>
                <button onClick={() => remove(notification.id)} className="focus:outline-none">
                  <FaTimes className="text-gray-500" />
                </button>
              </NotificationItem>
            ))}
          </AnimatePresence>
          <Footer>
            <button onClick={clear} className="text-sm text-gray-500 focus:outline-none">Clear All</button>
            <button onClick={markAllAsRead} className="text-sm text-gray-500 focus:outline-none">Mark All as read</button>
          </Footer>
        </NotificationMenu>
      )}
    </div>
  );
};

export default NotificationCenter;
