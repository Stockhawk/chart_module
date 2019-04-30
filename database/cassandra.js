var ExpressCassandra = require('express-cassandra');
var models = ExpressCassandra.createClient({
    clientOptions: {
        contactPoints: ['127.0.0.1'],
        protocolOptions: { port: 9042 },
        keyspace: 'charts2',
        queryOptions: {consistency: ExpressCassandra.consistencies.one}
    },
    ormOptions: {
        defaultReplicationStrategy : {
            class: 'SimpleStrategy',
            replication_factor: 1
        },
        migration: 'safe',
    }
});

var MyModel = models.loadSchema('Stock', {
    fields:{
      averageStock: "decimal",
      changePercent: "decimal",
      id: "int",
      noOfOwners: "int",
      recommendationPercent: "decimal",
      stockCompany: "text",
      stockId: "text",
    },
    key:["id"]
});

// MyModel or models.instance.Person can now be used as the model instance
console.log(models.instance.Stock === MyModel);

// sync the schema definition with the cassandra database table
// if the schema has not changed, the callback will fire immediately
// otherwise express-cassandra will try to migrate the schema and fire the callback afterwards
MyModel.syncDB(function(err, result) {
    if (err) throw err;
    // result == true if any database schema was updated
    // result == false if no schema change was detected in your models
});
// copy "Stock" from (id,averageStock,changePercent,id,noOfOwners,recommendationPercent,stockCompany,stockId) '/Users/macbookpro/documents/hr/sdc/chart_module/hello2.csv' with delimiter = ',' and HEADER = true;
// copy "charts2"."Stock" ("averageStock","changePercent","id","noOfOwners","recommendationPercent","stockCompany","stockId") from '/Users/macbookpro/documents/hr/sdc/chart_module/hello2.csv' with delimiter = ',' and HEADER = true;