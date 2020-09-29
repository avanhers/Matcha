import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";
import { useAsync } from "react-async-hook";

// A modifier pour que ca marche pas que pour ageRange
const useDebounceRequest = (requestFunction, ageRange) => {
  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(requestFunction, 300)
  );

  const searchResults = useAsync(async () => {
    console.log("in async");
    //Cond a parametrer si besoins
    // if (ageRange[0] === 18) {
    //   return [];
    // }
    return debouncedSearchFunction(ageRange);
  }, [debouncedSearchFunction, ageRange]);

  return searchResults;
};

export default useDebounceRequest;
