import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";
import { useAsync } from "react-async-hook";
import { useSelector } from "react-redux";
import React from "react";

// A modifier pour que ca marche pas que pour ageRange
const useDebounceRequest = (requestFunction, ageRange) => {
  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(requestFunction, 300)
  );
  const lockImmediateCall = React.useRef(false);
  const searchResults = useAsync(async () => {
    console.log("in async");
    //Cond a parametrer si besoins
    // if (ageRange[0] === 18) {
    //   return [];
    // }
    if (lockImmediateCall.current) return debouncedSearchFunction(ageRange);
    else {
      lockImmediateCall.current = true;
      return [];
    }
  }, [debouncedSearchFunction, ageRange]);

  return searchResults;
};

export default useDebounceRequest;
