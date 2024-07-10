import {updateCandidate} from "~/firebase/firebase";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)

    let response;

    await updateCandidate(body, body.id).then(() => {
        response = 200;
    }).catch(() => {
        response = 500;
    });

    return response;
})