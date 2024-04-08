import { GlobalState } from "@/@type/GlobalState.types";
import { createContext } from "react";

export default createContext<GlobalState>({cats: [], type: ""});
