/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await knex('courses').insert([
    {course_code:'CHIN1000',course_title:'Chinese-family',credits: 6, status: 'Avaliable'},
    {course_code:'AIST2000', course_title:'AI-phython',credits: 6, status: 'Avaliable'},
    {course_code:'AIST3000', course_title:'AI statics',credits: 6, status: 'Avaliable'},
    {course_code:'AIST4000', course_title:'Machine Learning',credits: 6, status: 'Avaliable'}
  ]);
   await knex('users').insert([
    {username:'hyman',password:'1234'}
   ])
};
