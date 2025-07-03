import React, { useState ,useRef} from "react";
import UserContext from "./context";
const ContextProvider = ({ children }) => {
    const [currmanager, setcurrmanager] = useState([]);
    return (
    <UserContext.Provider
      value={{
        currmanager, setcurrmanager
      }}
    >
      {children}
    </UserContext.Provider>
);
};
export default ContextProvider;