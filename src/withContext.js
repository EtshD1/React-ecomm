import React from "react";
import Context from "./context";

const withContext = WrapperComponent => {

  const WithHOC = props => {
    return (
      <Context.Consumer>
        {Context => <WrapperComponent {...props} context={context} />}
      </Context.Consumer>
    );
  };

  return WithHOC;
};

export default withContext;