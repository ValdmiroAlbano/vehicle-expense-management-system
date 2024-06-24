import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ itemName, activeItem, highlightMenuItem, children }) => {
  return (
    <li className={`nav-link ${activeItem === itemName ? 'active' : ''}`}>
      <NavLink 
        to={`/Dashboard/${itemName}`} 
        onClick={() => highlightMenuItem(itemName)}
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        {children}
      </NavLink>
    </li>
  );
}

export default MenuItem;
