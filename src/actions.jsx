import { v4 } from 'node-uuid'


export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAIL = 'SIGNIN_FAIL'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN OUT'

export const visibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const addTodo = (text) => {
  return {
    type: ADD_TODO, id: v4(), text
  }
}

export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO, id
  }
}

export const signInSuccess = (payload) => {
  return {
    type: SIGNIN_SUCCESS, payload
  }
}

export const signInFail = (payload) => {
  return {
    type: SIGNIN_FAIL, payload
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}
