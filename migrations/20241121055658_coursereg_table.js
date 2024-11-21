/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema
    .createTable('courses',function(table){
        table.increments('id').primary().notNullable();
        table.string('course_title').notNullable();
        table.string('course_code').notNullable();
        table.string('status').notNullable();
        table.integer('credits').notNullable();
    }) .createTable('users',function(table){
        table.increments('id').primary().notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('course')
};
