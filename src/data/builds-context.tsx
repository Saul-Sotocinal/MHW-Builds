import { Build } from "@/types/interfaces";
import { createContext } from "react";

export const BuildsContext = createContext<BuildContextType | undefined>(undefined);

interface BuildContextType {
    builds: Build[],
    setBuilds: React.Dispatch<React.SetStateAction<Build[]>>
}