require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

function searchByName(searchTerm) {
  knexInstance
    .select()
    .from('shoppinglist')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    })
}

// searchByName('ham');

function paginateItems(pageNumber) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNumber - 1);
  knexInstance
    .select()
    .from('shoppinglist')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    })
}

// paginateItems(4);

function getItemsAddedSince(daysAgo) {
  knexInstance
    .select()
    .from('shoppinglist')
    .where(
      'date_added', 
      '>', 
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .then(result => {
      console.log(result);
    })
}

// getItemsAddedSince(8);

function getCostPerCategory() {
  knexInstance
    .select('category')
    .sum('price as total_price')
    .from('shoppinglist')
    .groupBy('category')
    .then(result => {
      console.log(result);
    });
}

// getCostPerCategory();