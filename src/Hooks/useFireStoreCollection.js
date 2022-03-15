import {useEffect} from "react";
import {dataFromSnapshot} from "../firebase/fireStore/fireStoreService";
import {useDispatch} from "react-redux";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../Redux/Reducers/asyncSliceReducer";
export default function useFireStoreCollection({query, data, deps}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => {
                const docs = snapshot.docs.map(doc => dataFromSnapshot(doc))
                data(docs);
                dispatch(asyncActionFinish());

            },
            error => dispatch(asyncActionError(error))
        );
        return () => unsubscribe();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}