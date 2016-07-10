import { combineReducers } from 'redux'
import { SIGN_OUT, ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, SIGN_IN, SIGNIN_SUCCESS, SIGNIN_FAIL, visibilityFilters } from '../actions'
const { SHOW_ALL } = visibilityFilters;

const initialState = {
  name: 'seb',
  password: 'password'
}

function user(state = initialState, action){
  switch (action.type) {
    case SIGN_OUT:
      return Object.assign({});
    default:
      return state
  }
}

function todos(state = [], action){
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state, {id: action.id, text: action.text, completed: false}
      ]
    case TOGGLE_TODO:
      return state.map( (todo, index) => {
        if (index === action.id) {
          return Object.assign({}, todo, {completed: !todo.completed})
        }
        return todo;
      });
    default:
      return state;
  }
}

function signInFormStatus(state = {}, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return Object.assign({});
    case SIGNIN_FAIL:
      return Object.assign({}, state, action.payload);
    default:
      return state
  }
}


function visibilityFilter(state = SHOW_ALL, action){
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  signInFormStatus,
  user
})

export default todoApp
