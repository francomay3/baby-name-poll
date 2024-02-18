import { useEffect } from "react";

const useScrollTopOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useScrollTopOnMount;
