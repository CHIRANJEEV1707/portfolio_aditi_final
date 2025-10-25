import { createContext } from 'react';

type CursorContextType = {
  isTrailDisabled: boolean;
  setIsTrailDisabled: (isDisabled: boolean) => void;
};

export const CursorContext = createContext<CursorContextType>({
  isTrailDisabled: false,
  setIsTrailDisabled: () => {},
});
