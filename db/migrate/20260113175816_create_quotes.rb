class CreateQuotes < ActiveRecord::Migration[8.1]
  def change
    create_table :quotes do |t|
      t.references :company, null: false, foreign_key: true
      t.decimal :open, precision: 12, scale: 2
      t.decimal :high, precision: 12, scale: 2
      t.decimal :low, precision: 12, scale: 2
      t.decimal :price, precision: 12, scale: 2
      t.decimal :volume, precision: 15, scale: 0
      t.date :latest_trading_date
      t.decimal :previous_close, precision: 12, scale: 2
      t.decimal :change, precision: 12, scale: 2
      t.decimal :change_percent, precision: 8, scale: 4

      t.timestamps
    end
  end
end
