import { AppDispatch } from "../store";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

const useThunk = (thunk: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch<AppDispatch>();

    const runThunk = useCallback(
        (arg?: any) => {
            setIsLoading(true);
            dispatch(thunk(arg))
                .unwrap()
                .catch((err: any) => setError(err))
                .finally(() => setIsLoading(false));
        },
        [dispatch, thunk]
    );

    return [runThunk, isLoading, error] as const;
};

export default useThunk;
