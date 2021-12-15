import React from 'react';
import { Link } from 'react-router-dom';
import opts from './opts';
import './Menu.css';

/** Menu component for McCool Math app
 * Provides a link to each skill
 * skill name and menu display text stored in opts
 */
const Menu = () => {

    return (
        <div className="Menu">
          <nav className="Menu-nav">
              {Object.keys(opts).map(ele => {
                  return (
                    <Link to={`skills/${ele}`} key={ele} className="Menu-link">{opts[ele].text}</Link>
                  )
              })}
          </nav>
        </div>
    )
}

export default Menu;