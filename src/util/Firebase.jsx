// ---------------------------
//  External Dependencies
// ---------------------------
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/database'

var config = {
    databaseURL: 'https://yvip-howto.firebaseio.com',
    projectId: 'yvip-howto'
}

export const Firebase = firebase.initializeApp(config)
