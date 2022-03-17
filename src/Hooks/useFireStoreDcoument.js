import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {dataFromSnapshot} from "../firebase/fireStore/fireStoreService";


export default function useFireStoreDocument({query, data, deps, errorFunc}) {
    const dispatch = useDispatch()
    useEffect(() => {

        const unSubScribe = query().onSnapshot(
            snapShot => {
                if (!snapShot.exists) {
                    dispatch(errorFunc({code: 'not-found', message: 'could not find doucment'}));
                    return;
                }
                data(dataFromSnapshot(snapShot));

            },
            error => dispatch(errorFunc(error))
        );
        return () => {
            unSubScribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}