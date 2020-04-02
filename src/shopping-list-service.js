const ShoppingListService = {
  getAllItems(knex) {
    return knex
      .select('*')
      .from('shoppinglist');
  },
  insertItem(knex, item) {
    return knex
      .insert(item)
      .into('shoppinglist')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getItemById(knex, id) {
    return knex
      .select('*')
      .from('shoppinglist')
      .where({ id })
      .first();
  },
  deleteItem(knex, id) {
    return knex
      .from('shoppinglist')
      .where({ id })
      .delete();
  },
  updateItem(knex, id, newItemFields) {
    return knex
      .from('shoppinglist')
      .where({ id })
      .update(newItemFields);
  }
};

module.exports = ShoppingListService;