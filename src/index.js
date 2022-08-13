import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCQFwkawQBH-4eggSunYEg8o2M8IkHgdpA",
    authDomain: "fir-9-net-ninja-course.firebaseapp.com",
    projectId: "fir-9-net-ninja-course",
    storageBucket: "fir-9-net-ninja-course.appspot.com",
    messagingSenderId: "1003982372020",
    appId: "1:1003982372020:web:c79037ba8773df40442be1"
};


// initialize firebase app
initializeApp(firebaseConfig);


// initialize firestore service
const db = getFirestore();


// getting the reference of the collection present inside our database
const collectionReference = collection(db, 'books');

// queries
const q = query(collectionReference, where("author", "==", "patrick rothfuss"), orderBy('title', 'desc')); 


// 01) getting collection data present from the collection database
onSnapshot(q, (snapshot) => {

    let books = [];

    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    });

    console.log(books);

});


// 02) create a new document
const addBookForm = document.querySelector('.add');

addBookForm.addEventListener('submit', (e) => {

    e.preventDefault();

    addDoc(collectionReference, {
        title: addBookForm.title.value, 
        author: addBookForm.author.value,
    })
        .then(() => {

            // resetting the form
            addBookForm.reset();

        })
        .catch((err) => {

            console.log(err);

        });

});


// 03) deleting a document
const deleteBookForm = document.querySelector('.delete');

deleteBookForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const documentReference = doc(db, 'books', deleteBookForm.id.value);

    deleteDoc(documentReference)
        .then(() => {

            deleteBookForm.reset();

        });

});