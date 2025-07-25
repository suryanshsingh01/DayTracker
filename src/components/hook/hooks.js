import { useState } from 'react';

const Hooks = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  return [currentDate, setCurrentDate];
};

export default Hooks;
