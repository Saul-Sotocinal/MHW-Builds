/**
 * How to use the useContext react hook for passing and modifying its value 
 * by stack overflow user Adam Jenkins
 * https://stackoverflow.com/users/954940/adam-jenkins
 * 
 * Question:
 * https://stackoverflow.com/questions/69247544/how-to-properly-change-react-context-value
 */

import { BUILDS_TEMPLATE } from "@/data/sample-builds";
import { Build } from "@/types/interfaces";
import { createContext, ReactNode, useState } from "react";

export const BuildsContext = createContext<BuildContextType | undefined>(undefined);

interface BuildContextType {
  builds: Build[],
  setBuilds: React.Dispatch<React.SetStateAction<Build[]>>
}

export function BuildsContextProvider({ children }: { children: ReactNode }) {
  const [builds, setBuilds] = useState<Build[]>(BUILDS_TEMPLATE);

  return (
    <BuildsContext.Provider value={{ builds, setBuilds }}>
      {children}
    </BuildsContext.Provider>
  )
}