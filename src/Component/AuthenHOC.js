import React from "react";
import { AuthContext } from ".././Auth/auth";
import { render } from "@testing-library/react";

const AuthenHOC = (OriginalComponent, Roles) => {
  class NewComponent extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      if (Roles.includes(this.context.authUser.roles)) {
        console.log(this.context.authUser);
        return <OriginalComponent {...this.props} />;
      } else {
        console.log(this.context.authUser);
        console.log(Roles)
        return '';
      }
    }
  }
  NewComponent.contextType = AuthContext;
  return NewComponent;
};
export default AuthenHOC;
