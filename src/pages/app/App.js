import { Component } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import IndexPage from "../IndexPage/IndexPage";
import FormPage from "../FormPage/FormPage";
import HomePage from "../HomePage/HomePage";
import AuthPage from "../AuthPage/AuthPage";

export default class App extends Component {
  state = {
    user: null,
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        token = null;
      } else {
        let userDoc = payload.user;
        this.setState({ user: userDoc });
      }
    }
  }
  handleLogout = () => {
    // let token = localStorage.getItem("token");
    console.log("logout");
    localStorage.removeItem("token");
    // token = null;
    this.setState({ user: "" });
  };

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData });
  };

  render() {
    return (
      <main className="App">
        {this.state.user ? (
          <Routes>
            <Route path="/home" element={<HomePage handleLogout={this.handleLogout} />}/>
            <Route path="/tickets" element={<IndexPage user={this.state.user} handleLogout={this.handleLogout}/>}/>
            <Route path="/new" element={ <FormPage reporter={this.state.user} handleLogout={this.handleLogout}/>}/>
            <Route path="/*" element={<Navigate to="/home" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<AuthPage setUserInState={this.setUserInState} />}/>
            <Route path="/home" element={<HomePage />} />
            <Route path="/tickets" element={<HomePage />} />
            <Route path="/new" element={<HomePage />} />
            {/* <Route path="/*" element={<Navigate to="/home" replace />} /> */}
          </Routes>
        )}
      </main>
    );
  }}








