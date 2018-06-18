
const Datastore = require('react-native-local-mongodb');
const db = new Datastore({ filename: 'asyncStorageKey', autoload: true });

class Storage {
  constructor() { }

  saveOnLocalStorage(candidateExam) {
    return new Promise((resolve, reject) => {
      db.insert(candidateExam, (err, newDoc) => {
        if (err) {
          reject(err);
        }
        resolve(newDoc);
      });
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
