import React from 'react'
import TodoList from './TodoList'
import AddTodo from '../containers/AddTodo'
import Menu from '../containers/Menu'
import Footer from '../components/Footer'
import BooksList from '../components/BooksList'
import connect from 'react-redux'

const App = ({children, user}) => {
  console.log(user);
  return (<div>
    <Menu user={user}/>
    <div className="ui container">
      {children}
    </div>
  </div>)
}

export default App;
