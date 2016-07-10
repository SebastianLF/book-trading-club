import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Menu = ({user}) => {

    return (
        <div className="ui menu">
          <div className="ui container">
            <Link className="item" to='/'>Home</Link>
            <div className="right menu">
              {user ? <Link className="item" to='/allbooks'>All books</Link> : ''}
              {user ? <Link className="item" to='/mybooks'>My books</Link> : ''}
              {user ? '' : <Link className="item" to='/signin'>Sign In</Link>}
              {user ? <Link className="item" to='/signin'><i className="setting icon"></i></Link> : ''}
              {user ? <Link className="item" to='/logout'>Logout</Link> : ''}
            </div>
          </div>
        </div>
    )
}

export default Menu
