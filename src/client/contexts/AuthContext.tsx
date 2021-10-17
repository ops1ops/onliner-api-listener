import { createContext, Dispatch } from "react";

type ContextType = {
  state: any;
  dispatch: Dispatch<{ type: any; payload: any }>;
};

export default createContext<ContextType>({ state: {}, dispatch: () => {} });
