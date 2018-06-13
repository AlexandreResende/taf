
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

  async loadFromLocalStorage() {
    const docs = await db.find({});

    return docs;
  }

  removeFromLocalStorage() {
    db.remove({}, { multi: true });
  }
}

module.exports = Storage;
