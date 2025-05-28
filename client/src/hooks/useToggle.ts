import { useState } from 'react';

const useToggle = (initialState: boolean = false) => {
  const [state, setState] = useState(initialState);
  const toggle = () => setState((state) => !state);
  return [state, toggle, setState] as const;
}

export default useToggle;
