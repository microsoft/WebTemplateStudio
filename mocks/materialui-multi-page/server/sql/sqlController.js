var SQLClient = require("./sqlClient");
const CONSTANTS = require("../constants");
const uuidv4 = require("uuid/v4");

module.exports = class SQLController {
  constructor() {
    this.sqlClient = new SQLClient(
      CONSTANTS.COSMOS.DATABASE,
      CONSTANTS.COSMOS.CONTAINER
    );

    this.sqlClient.connect();
  }

  /*
   * Engine: Replace with container and database names (check constants.ts)
   */
  // Find all items from the {ListItem} container in Cosmos Core SQL {List} database
  async get(req, res) {
    const querySpec = {
      query: "SELECT * FROM root r",
      parameters: []
    };

    try {
      const { result: results } = await this.sqlClient.container.items
        .query(querySpec)
        .toArray();

      res.json(results.reverse());
    } catch (error) {
      res.status(500).send(error);
    }
  }

  /*
   * Engine: Replace with container and database names (check constants.ts)
   */
  // Post a new item to the {ListItem} container in Cosmos Core SQL {List} database
  async create(req, res) {
    var id = uuidv4();
    var listItem = {
      _id: id,
      id: id,
      text: req.body.text
    };

    try {
      await this.sqlClient.container.items.create(listItem);
      res.json(listItem);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  /*
   * Engine: Replace with container and database names (check constants.ts)
   */
  // Remove an item from the {ListItem} container in Cosmos Core SQL {List} database
  async destroy(req, res) {
    const { _id } = req.params;
    try {
      let listItem = await this.sqlClient.container.item(_id).read();
      await this.sqlClient.container.item(_id).delete();
      res.json({ _id: listItem.body._id });
    } catch (error) {
      res.status(500).send(error);
    }
  }
};
