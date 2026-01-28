import dispatcher from "../dispatcher/AppDispatcher";
let _employees = [];
let listeners = [];
const employeeStore = {
  getAllEmployees() {
    return _employees;
  },
  addChangeListener(callback) {
    listeners.push(callback);
  },
  removeChangeListener(callback) {
    listeners = listeners.filter(cb => cb !== callback);
  },
  emitChange() {
    listeners.forEach(cb => cb());
  }
};
// Register with dispatcher
dispatcher.register((action) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      _employees.push(action.payload);
      employeeStore.emitChange();
      break;
    default:
      break;
  }
});
export default employeeStore;