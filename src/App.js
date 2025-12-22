import "./App.css";

import Login from "./pages/Login";
import TaskPage from "./pages/TaskPage";

function App() {
  const token = localStorage.getItem("token");

  return token ? <TaskPage /> : <Login />;
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <div className="App">
//         <h1>Task Manager</h1>
//         <TaskList />
//       </div>
//     </div>
//   );
// }

// export default App;
