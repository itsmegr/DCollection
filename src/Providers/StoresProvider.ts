import { createContext, useContext } from "react";
import { IAppStore } from "../Core/Stores/Index";

export const StoresContext = createContext<IAppStore>({} as IAppStore);

export const useStores = () => useContext(StoresContext);
