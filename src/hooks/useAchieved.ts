import { useEffect, useState } from 'react';
import { isAchieved, setAchieved } from '../utils';

export const useAchieved = (markId: string) => {
  const [achieved, _setAchieved] = useState(isAchieved(markId));

  useEffect(() => {
    setAchieved(markId, achieved);
  }, [markId, achieved]);

  return [achieved, _setAchieved] as const;
};
