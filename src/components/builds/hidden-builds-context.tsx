/**
 * How to use the useContext react hook for passing and modifying its value 
 * by stack overflow user Adam Jenkins
 * https://stackoverflow.com/users/954940/adam-jenkins
 * 
 * Question:
 * https://stackoverflow.com/questions/69247544/how-to-properly-change-react-context-value
 */

import { createContext, ReactNode, useState } from "react";

export const HiddenBuildsContext = createContext<HiddenBuildContextType | undefined>(undefined);

interface HiddenBuildContextType {
  hiddenBuilds: string[],
  setHiddenBuilds: React.Dispatch<React.SetStateAction<string[]>>
}

// The hidden builds context is just for hiding filtered builds.
export function HiddenBuildsContextProvider({ children }: { children: ReactNode }) {
  const [hiddenBuilds, setHiddenBuilds] = useState<string[]>([]);

  return (
    <HiddenBuildsContext.Provider value={{ hiddenBuilds, setHiddenBuilds }}>
      {children}
    </HiddenBuildsContext.Provider>
  )
}