import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import Todo from './Todo'

let TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
      />
    )}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

const mapStateToProps = ({todos}) => {
  return {
    todos
  }
}

TodoList = connect(mapStateToProps)(TodoList);

export default TodoList
