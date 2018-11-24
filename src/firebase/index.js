import firebase from 'firebase/app'
import 'firebase/storage'

var config = {
    apiKey: "AIzaSyA2O1cgzyV9yciw4o-ldDLft3SwKLaVPO4",
    authDomain: "react-file-upload-695c5.firebaseapp.com",
    databaseURL: "https://react-file-upload-695c5.firebaseio.com",
    projectId: "react-file-upload-695c5",
    storageBucket: "react-file-upload-695c5.appspot.com",
    messagingSenderId: "1053324846197"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
} 