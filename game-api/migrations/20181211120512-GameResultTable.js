'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
 exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
  };

exports.up = function(db) {
    return db.createTable("GameResult", {
      ID: { type: "int", primaryKey: true, autoIncrement: true },
      Won: { type: "boolean", notNull: true },
      Score: { type: "int", notNull: true },
      Total: { type: "int", notNull: true }
    });
  };

exports.down = function(db) {
    return db.dropTable("GameResult");
  };

exports._meta = {
    version: 1
  };
