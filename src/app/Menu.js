import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

/** Menu component for McCool Math app
 * Provides a link to each valid skill
 * URL path and menu display text stored in VALID_SKILLS
 */
const Menu = () => {

    const VALID_SKILLS = {
        "integers": "Integer Operations", 
        "orderofops": "Order of Operations", 
        "lineareqn": "Linear Equations"
    }

    return (
        <div className="Menu">
          <nav className="Menu-nav">
              {Object.keys(VALID_SKILLS).map(ele => {
                  return (
                    <Link to={`skills/${ele}`} key={ele} className="Menu-link">{VALID_SKILLS[ele]}</Link>
                  )
              })}
          </nav>
        </div>
    )
}

export default Menu;