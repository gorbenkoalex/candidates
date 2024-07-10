// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref as refDb, set, child, push, get, update } from "firebase/database";
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import {string} from "yup";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKpdNkHdAN1d1BTCXgflh97Eqo-wJcabc",
    authDomain: "candidates-e1234.firebaseapp.com",
    projectId: "candidates-e1234",
    storageBucket: "candidates-e1234.appspot.com",
    messagingSenderId: "882210310006",
    appId: "1:882210310006:web:80b17356862687f3e11c57",
    measurementId: "G-P9XZM1SES9",
    databaseURL: "https://candidates-e1234-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// const analytics = getAnalytics(app);

const storage = getStorage();

const uploadFile = async (file) => {
    let url;
    const refFile = refStorage(storage, 'candidates/' + file.name);
    await uploadBytes(refFile, file).then((snapshot) => {
        url = getDownloadURL(snapshot.ref);
    });
    return url;
}

const getAllCandidates = async () => {
    return await get(child(refDb(database), '/candidates'))
}
const addCandidate = async ({first_name, last_name, email, bio, skills, resume_file, github_url}) => {
    const db = getDatabase();
    const newPostKey = push(child(refDb(database), 'candidates')).key;
    const fileUrl = await uploadFile(resume_file);

    return await set(refDb(db, 'candidates/' + newPostKey), {
        id: newPostKey,
        first_name: first_name,
        last_name: last_name,
        email : email,
        bio: bio,
        skills: skills,
        resume_file: fileUrl,
        github_url: github_url,
    });
}

const updateCandidate = async (candidate, id) => {
    const db = getDatabase();
    const updates = {};

    updates['/candidates/' + id] = candidate;
    await update(refDb(db), updates)
}

export { getAllCandidates, addCandidate, uploadFile, updateCandidate };