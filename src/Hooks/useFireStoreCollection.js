import {useEffect} from "react";
import {dataFromSnapshot} from "../firebase/fireStore/fireStoreService";
import {useDispatch} from "react-redux";

export default function useFireStoreCollection({query, data, deps, errorFunc}) {
    const dispatch = useDispatch();
    useEffect(() => {

        const unsubscribe = query().onSnapshot(
            snapshot => {
                const docs = snapshot.docs.map(doc => dataFromSnapshot(doc))
                data(docs);


            },
            error => dispatch(errorFunc(error))
        );
        return () => unsubscribe();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}