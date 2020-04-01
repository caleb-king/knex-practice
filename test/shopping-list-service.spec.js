require('dotenv').config();

const knex = require('knex');
const shoppingListService = require('../src/shopping-list-service');



describe('Shopping List service object', () => {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'firstItem',
      price: 2.75,
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      checked: false,
      category: 'Lunch'
    },
    {
      id: 2,
      name: 'secondItem',
      price: 3.99,
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      checked: true,
      category: 'Main'
    },
    {
      id: 3,
      name: 'thirdItem',
      price: 0.77,
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
    
    it('getAllArticles() resolves all articles from "shoppinglist" table', () => {

    });

    it('getItemById() resolves an article by id from "shoppinglist" table', () => {

    });

    it('deleteArticle() removes an article by id from "shoppinglist" table', () => {

    });

    it('updateItem() updates an articles from "shoppinglist" table', () => {

    });
  });

  context('Given "shoppinglist" has NO data', () => {
    it('getAllItems() resolves an empty array', () => {

    });

    it('insertArticle() inserts a new article and resolves the new articles with an "id"', () => {

    });
  });
});