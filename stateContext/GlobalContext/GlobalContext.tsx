import { GlobalState } from "@/@type/GlobalState.types";
import { Context, createContext } from "react";

export default createContext<GlobalState>({auth: false});
