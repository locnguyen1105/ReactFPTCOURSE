import React from "react";
import { AuthContext } from "../context/auth.js";
import { render } from "@testing-library/react";

const AuthenHOC = (OriginalComponent, Roles) => {
  class NewComponent extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      if (Roles.includes(this.context.authUser.roles[0])) {
        return <OriginalComponent {...this.props} />;
      } else {
        return;
      }
    }
  }
  NewComponent.contextType = AuthContext;
  return NewComponent;
};
export default AuthenHOC;
