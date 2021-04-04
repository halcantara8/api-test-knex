
exports.up = function(knex) {
    return knex.schema.createTable('tokens',(table)=>{
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.text('token', 'longtext').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.new);
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.foreign('user_id').references('id').inTable('users');
    });
};
exports.down = function(knex) {
    return knex.schema.dropTable('tokens');
};
