const firebase = require('firebase');
//require('firebase/firestore');

export class Firebase {
    constructor() {
        this._config =  {
            apiKey: "AIzaSyCDmiLTVac4m1qa7MU8wFyYiOTBnl-7i1s",
            authDomain: "whatsapp-clone-bd7a5.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-bd7a5.firebaseio.com",
            projectId: "whatsapp-clone-bd7a5",
            storageBucket: "gs://whatsapp-clone-bd7a5.appspot.com",
            messagingSenderId: "731644604120",
            appId: "1:731644604120:web:363c9a88c01f604d92b1ad",
            measurementId: "G-2F9NMM39YE"
          };
        this.init();
    }

    init() {
        if(!window._initializedFirebase) {
            firebase.initializeApp(this._config);
            // firebase.firestore().settings({
            //     timestampsInSnapshots: true
            // });
            window._initializedFirebase = true;
        }
        
    }

    static db() {
        return firebase.firestore();
    }

    static hd() {
        return firebase.storage();
    }

    initAuth() {
        return new Promise((s, f) => {
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(result => {
                let token = result.credential.accessToken;
                let user = result.user;
                s({
                    user,
                    token
                });
            })
            .catch(err => {
                f(err);
            })
        });
    }

}