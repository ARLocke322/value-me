class CreateCompanies < ActiveRecord::Migration[8.1]
  def change
    create_table :companies do |t|
      t.string :symbol, null: false
      t.string :asset_type
      t.string :name
      t.string :currency
      t.string :country
      t.string :sector

      t.timestamps
    end

    add_index :companies, :symbol, unique: true
  end
end
