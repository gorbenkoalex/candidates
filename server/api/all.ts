import {getAllCandidates} from "~/firebase/firebase";

export default defineEventHandler(async () => {
    let data;
    await getAllCandidates().then((snapshot) => {
        if (snapshot.exists()) {
            data = Object.values(snapshot.val());
        } else {
            console.log("No data available");
            return [];
        }
    });

    return data;
})