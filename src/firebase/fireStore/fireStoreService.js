import {projectFireStore, timeStamp} from "../config";

export function dataFromSnapshot(snapshot) {
    if (!snapshot.exists) return undefined;
    const data = snapshot.data();
    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (data[prop] instanceof timeStamp) { // this checks whether date is a child of fireBase.fireStore.TimeStamp
                data[prop] = data[prop].toDate();
            }
        }
    }

    return {
        ...data,
        id: snapshot.id
    }

}

export const listenToUsersFromFireStore = () => projectFireStore.collection('Users');
export const listenToProjectsFromFireStore = () => projectFireStore.collection('Projects');