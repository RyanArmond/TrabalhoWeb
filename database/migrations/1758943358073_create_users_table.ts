import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.string('username', 50).notNullable().unique()
      table.string('display_name', 50).nullable()
      table.date('birth_date').notNullable()

      // Credenciais de contato
      table.string('email', 254).nullable().unique()
      table.string('phone_number', 20).nullable().unique()

      table.string('password').notNullable()

      // Perfil social
      table.string('avatar_url').nullable()
      table.string('bio', 160).nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
