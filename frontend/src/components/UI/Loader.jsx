import { memo } from 'react';

const Loader = memo((props) => {
  const { text = "Loading..." } = props;
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full">
      <div className="loader-spinner"></div>
      {text && <div className="text-secondary mt-4 text-sm font-medium animate-pulse">{text}</div>}
    </div>
  );
});

Loader.displayName = 'Loader';
export default Loader;
