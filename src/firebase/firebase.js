import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAaPoEtsGEDKre59jDd9lIBRZ1ZQSvpHgQ",
    authDomain: "expensify-9c3ba.firebaseapp.com",
    databaseURL: "https://expensify-9c3ba.firebaseio.com",
    projectId: "expensify-9c3ba",
    storageBucket: "expensify-9c3ba.appspot.com",
    messagingSenderId: "540980647769",
    appId: "1:540980647769:web:5cf29c55b435b732c15e48",
    measurementId: "G-SCPWZ5E8YR"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

database.ref().set({
    name: 'Alex Pham',
    age: 20,
    stressLevel: 6,
    job: {
        title: "Software developer",
        company: "Google"
    },
    location: {
        city: "Sydney",
        country: "Australia"
    }
}).then(() => {
    console.log("Data is saved")
}).catch((error) => {
    console.log(`This failed: ${error}`)
})

database.ref().update({
    stressLevel: 9,
    'job/company': "Amazon",
    "location/city": "Seattle"
})

// database.ref("isSingle").remove().then(
//     console.log("removed isSIngle")
// )

