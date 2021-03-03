import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App()
{
  return(
    <div>
  <Router>
    <Route  path="/" exact component = {Login}/>
    <Route  path="/chat" exact component = {Chat}/>
  </Router>
  </div>
  )
}
export default App;
