var SQLClient = require("./sqlClient");
const CONSTANTS = require("../constants");

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
      query: "SELECT r.id as _id, r.text FROM root r ORDER BY r._ts DESC",
      parameters: []
    };

    try {
      const { result: results } = await this.sqlClient.container.items
        .query(querySpec)
        .toArray();

      res.json(results);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  /*
   * Engine: Replace with container and database names (check constants.ts)
   */
  // Post a new item to the {ListItem} container in Cosmos Core SQL {List} database
  async create(req, res) {
    var listItem = {
      text: req.body.text
    };

    try {
      let created = await this.sqlClient.container.items.create(listItem);
      res.json({ _id: created.body.id, text: listItem.text });
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
      res.json({ _id: listItem.body.id });
    } catch (error) {
      res.status(500).send(error);
    }
  }
};
