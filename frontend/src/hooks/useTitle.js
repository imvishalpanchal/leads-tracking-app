import { useEffect, useLayoutEffect } from 'react';
import { APP_BASE_TITLE } from '../utils/constants';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useTitle = (title) => {
  useIsomorphicLayoutEffect(() => {
    if (typeof document === 'undefined') return;
    const pageTitle = title ? `${title} | ${APP_BASE_TITLE}` : APP_BASE_TITLE;
    if (document.title !== pageTitle) {
      document.title = pageTitle;
    }
  }, [title]);
};

export default useTitle;
