import React from 'react';
import {Link} from 'react-router-dom';
import './Menu.css';

const Menu = () => {

    const VALID_SKILLS = {
        "integers": "Integer Operations", 
        "orderofops": "Order of Operations"
    }

    return (
        <div className="Menu">
          <nav className="Menu-nav">
              {Object.keys(VALID_SKILLS).map(ele => {
                  return (
                    <Link to={ele} key={ele} className="Menu-link">{VALID_SKILLS[ele]}</Link>
                  )
              })}
          </nav>
        </div>
    )
}

export default Menu;