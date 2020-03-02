const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const uri = "mongodb+srv://juan:locobeta661@cluster0-la3ea.mongodb.net/test?retryWrites=true&w=majority";

function MongoUtils() {
  const mu = {},
    dbName = "CocktailIO",
    colName = "cocktails";

  mu.connect = () => {
    const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
    return client.connect();
  };

  mu.cocktails = {};

  mu.cocktails.find = query =>
    mu.connect().then(client => {
      const cocktailCol = client.db(dbName).collection(colName);
      return cocktailCol
        .find(query)
        .sort({ timestamp: -1 })
        .toArray()
        .finally(() => client.close());
    });

  mu.cocktails.findOneByID = id =>
    mu.connect().then(client => {
      const cocktailCol = client.db(dbName).collection(colName);

      // when searching by id we need to create an ObjectID
      return cocktailCol
        .findOne({ _id: new ObjectID(id) })
        .finally(() => client.close());
    });

  mu.cocktails.findManyByIngredient = ingredient =>
    mu.connect().then(client => {
      const cocktailCol = client.db(dbName).collection(colName);
      let query = {strIngredient1: ingredient};      
      // when searching by id we need to create an ObjectID
      return cocktailCol
        .find(query)
        .sort({ timestamp: -1 })
        .toArray()
        .finally(() => client.close());
    });

    mu.cocktails.findManyByIngredients = ingredients =>
    mu.connect().then(client => {
      const cocktailCol = client.db(dbName).collection(colName);
      let query = "";   
      // when searching by id we need to create an ObjectID
      return cocktailCol
        .find(query)
        .sort({ timestamp: -1 })
        .toArray()
        .finally(() => client.close());
    });
    return mu;
}

module.exports = MongoUtils();
