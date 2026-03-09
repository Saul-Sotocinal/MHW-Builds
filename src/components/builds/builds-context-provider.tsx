import { BuildsContext } from "@/data/builds-context";
import { BUILDS_TEMPLATE } from "@/data/data";
import { Build } from "@/types/interfaces";
import { ReactNode, useState } from "react";

export function BuildsContextProvider({ children }: { children: ReactNode }) {
  const [builds, setBuilds] = useState<Build[]>(BUILDS_TEMPLATE);

  return (
    <BuildsContext.Provider value={{ builds, setBuilds }}>
      {children}
    </BuildsContext.Provider>
  )
}