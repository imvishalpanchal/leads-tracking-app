import { useEffect } from 'react';
import { APP_BASE_TITLE } from '../utils/constants';

const useTitle = (title) => {
  useEffect(() => {
    const pageTitle = title
      ? `${title} | ${APP_BASE_TITLE}`
      : APP_BASE_TITLE;

    if (document.title !== pageTitle) {
      document.title = pageTitle;
    }
  }, [title]);
};

export default useTitle;