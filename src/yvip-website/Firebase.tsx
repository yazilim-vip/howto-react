import firebase from 'firebase/app'

import 'firebase/database'

const config = {
    databaseURL: 'https://yvip-howto.firebaseio.com',
    projectId: 'yvip-howto'
}

export const Firebase = firebase.initializeApp(config)
