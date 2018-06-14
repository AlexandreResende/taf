
const Datastore = require('react-native-local-mongodb');
const db = new Datastore({ filename: 'asyncStorageKey', autoload: true });

class Storage {
  constructor() { }

  saveOnLocalStorage(candidateExam) {
    db.insert(candidateExam, (err, newDoc) => {
      console.log('done');
      //console.log(newDoc);
    });
  }

  loadFromLocalStorage() {
    return new Promise((resolve, reject) => {
      db.find({}, (err, docs) => {
        if (err) {
          reject(err);
        }
        resolve(docs);
      });
    });
  }

  removeFromLocalStorage() {
    db.remove({}, { multi: true });
  }
}

export { Storage };
