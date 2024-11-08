import { createContext } from 'react';
import { GlobalState } from '@/@type/GlobalState.types';

export default createContext<GlobalState>({ cats: [], type: '', keyword: '' });
