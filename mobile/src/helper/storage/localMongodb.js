
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
    const candidates = [];
    db.find({}, (err, docs) => {
      console.log(docs);
    });
  }

  removeFromLocalStorage() {
    db.remove({}, { multi: true });
  }
}

module.exports = Storage;
