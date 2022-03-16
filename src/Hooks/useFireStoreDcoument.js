import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../Redux/Reducers/asyncSliceReducer";
import {dataFromSnapshot} from "../firebase/fireStore/fireStoreService";


export default function useFireStoreDocument({query, data, deps}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncActionStart());
        const unSubScribe = query().onSnapshot(
            snapShot => {
                data(dataFromSnapshot(snapShot));
                dispatch(asyncActionFinish());
            },
            error => dispatch(asyncActionError(error))
        );
        return () => {
            unSubScribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}