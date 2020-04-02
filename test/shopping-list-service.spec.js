require('dotenv').config();
/*global expect*/
const knex = require('knex');
const ShoppingListService = require('../src/shopping-list-service');



describe('Shopping List service object', () => {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'firstItem',
      price: '2.75',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      checked: false,
      category: 'Lunch'
    },
    {
      id: 2,
      name: 'secondItem',
      price: '3.99',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      checked: true,
      category: 'Main'
    },
    {
      id: 3,
      name: 'thirdItem',
      price: '0.77',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      checked: false,
      category: 'Snack'
    },
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => db('shoppinglist').truncate());

  afterEach(() => db('shoppinglist').truncate());

  after(() => db.destroy());

  context('Given "shoppinglist" has data,', () => {
    beforeEach(() => {
      return db
        .into('shoppinglist')
        .insert(testItems);
    });
    
    it('getAllItems() resolves all items from "shoppinglist" table', () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems);
        });
    });

    it('getItemById() resolves an item by id from "shoppinglist" table', () => {
      const itemId = 2;
      const item_2 = testItems[itemId - 1];
      return ShoppingListService.getItemById(db, itemId)
        .then(result => {
          expect(result).to.eql(item_2);
        });
    });

    it('deleteItem() removes an item by id from "shoppinglist" table', () => {
      const deleteId = 2;
      return ShoppingListService.deleteItem(db, deleteId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(result => {
          const expected = testItems.filter(item => item.id !== deleteId);
          expect(result).to.eql(expected);
        });
    });

    it('updateItem() updates an items from "shoppinglist" table', () => {
      const idOfItemToUpdate = 2;
      const newItemData = {
        name: 'updatedName',
        price: '4.36',
        date_added: new Date('1919-12-22T16:28:32.615Z'),
        checked: false,
        category: "Snack"
      }
      return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getItemById(db, idOfItemToUpdate))
        .then(result => {
          expect(result).to.eql({
            id: idOfItemToUpdate,
            ... newItemData
          });
        });
    });
  });

  context('Given "shoppinglist" has NO data', () => {
    it('getAllItems() resolves an empty array', () => {
      return ShoppingListService.getAllItems(db)
        .then(result => {
          expect(result).to.eql([]);
        });
    });

    it('insertItem() inserts a new item and resolves the new items with an "id"', () => {
      const newItem = {
        name: 'newItem',
        price: '1.54',
        date_added: new Date('1922-12-22T16:28:32.615Z'),
        checked: true,
        category: 'Snack'
      };
      return ShoppingListService.insertItem(db, newItem)
        .then(result => {
          expect(result).to.eql({id: 1, ...newItem});
        });
    });
  });
});