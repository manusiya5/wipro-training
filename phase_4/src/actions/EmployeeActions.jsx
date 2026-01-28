import React from 'react'
import dispatcher from "../dispatcher/AppDispatcher"
// which action or what will happen , which is not responsible for updating the state 


export function addEmployee(name) {
  dispatcher.dispatch({
    type: "ADD_EMPLOYEE",
    payload: name
  });
}