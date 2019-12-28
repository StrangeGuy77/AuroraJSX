import React, { Component } from "react";
import Home from "./content/layouts/Home";
import Navigation from "./assets/Navigation";
import SoftwareHome from "./content/software/SoftwareHome";
import LibraryHome from "./content/library/LibraryHome";
import OurServices from "./content/layouts/OurServices";
import ContactUs from "./content/layouts/ContactUs";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  state = {
    logged: false
  };

  render() {
    return (
      <Router>
        <Navigation logged={this.state.logged} />
        <Route exact path="/" component={Home} />
        <Route path="/software" component={SoftwareHome} />
        <Route path="/library" component={LibraryHome} />
        <Route path="/our-services" component={OurServices} />
        <Route path="/contact-us" component={ContactUs} />
      </Router>
    );
  }
}
