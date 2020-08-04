// Initialize Firebase
let firebaseConfig = {
    apiKey: "AIzaSyCfMEaftcuYXLnGZ0Cjc11w7-vijbJW7JY",
    authDomain: "dogmatchapp-6baa6.firebaseapp.com",
    databaseURL: "https://dogmatchapp-6baa6.firebaseio.com",
    projectId: "dogmatchapp-6baa6",
    storageBucket: "dogmatchapp-6baa6.appspot.com",
    messagingSenderId: "881707155237",
    appId: "1:881707155237:web:52a6a2c31ec167c01ae4cc"
};
firebase.initializeApp(firebaseConfig);

/* 실시간 데이터베이스 */
let database = firebase.database();

// 메모 저장 함수
const writememodb = (user, memo, color, assign_date, iscompleted=false) => {
    let memoRef = database.ref('todolist/');
    let newmemoRef = memoRef.push();
    newmemoRef.set({
        user: user,
        memo: memo,
        color: color,
        assign_date: assign_date,
        iscompleted: iscompleted
    }), (error) => {
        if (error) {
            console.log("error");
        } else {
            console.log("Data saved successfully!");
        }
    };
};

const updatememodb = () => {

};

// 유저 이름 읽기 함수 (예시)
const readdb = (path) => {
    const target = database.ref(path);
    target.once('value').then( (datasnapshot) => {
        console.log(datasnapshot.val());
        return datasnapshot.val();
    });
};

/* cloud firestore */
let firedb = firebase.firestore();

// collection에 문서 만들기 함수 (예시)
const writeuserfiredb = (docname, em, name, pw) => {
    let docRef = firedb.collection('User').doc(docname);
    docRef.set({
        email: em,
        username: name,
        password: pw,
    }).catch((err) => {
        console.log('Error');
    });
};

// collection 문서 업데이트 함수 (예시)
const updateuserfiredb = (uesrid, data) => {
    let docRef = firedb.collection('User').doc(userid);
    docRef.update(data)
        .then(() => {
            console.log('update complete');
        })
        .catch((err) => {
            console.log('Error');
        });
};

// collection의 문서들 읽기 힘수 (예시)
const readfiredb = (colname) => {
    let ret = [];
    firedb.collection(colname).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                ret.push([doc.id, doc.data()]);
            });
            return ret;
        }).catch((err) => {
        console.log('Error getting documents', err);
    });
};

const readfiredoc = (colname, docname, f=0) => {
    firedb.collection(colname).doc(docname).get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
                if (f==0) {
                    return doc.data();
                } else {
                    f(doc.data());
                }
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
};

/* cloud storage */
// Create a roof reference
let storageRef = firebase.storage().ref();

// 이미지 업로드
const uploadimage = (docid, image) => {
    // Create a reference to 'images/imagename'
    let imagesRef = storageRef.child('images/' + docid + '/' + image.name);
    imaegname.put(image)
        .on('state_changed', snapshot => {
            console.log(snapshot)
        }, error => {
            console.log(error);
        }, () => {
            console.log('Succesfully uploaded!');
        });

};

// 이미지 읽어오기
const readimage = (docid) => {

};