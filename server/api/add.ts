import {addCandidate} from "~/firebase/firebase";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    let response;

    await addCandidate(body).then(() => {
        response = 200;
    }).catch(() => {
        response = 500;
    });

    return response;
})