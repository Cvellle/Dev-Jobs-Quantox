import { useRef } from "react";

export const useComponentWillMount = (callbackFunction) => {
    const willMount = useRef(true);
  
    if (willMount.current) callbackFunction();
  
    willMount.current = false;
  };
  