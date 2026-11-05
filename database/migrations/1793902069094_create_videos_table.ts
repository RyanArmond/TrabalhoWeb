import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'videos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('description').nullable()

      table.text('video_url').notNullable()

      table.integer('user_id')
           .unsigned()
           .notNullable()
           .references('id').inTable('users')
           .onDelete('CASCADE')
           .index()

      table.timestamp('created_at').notNullable().index()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}