class CreateAcfReports < ActiveRecord::Migration[8.1]
  def change
    create_table :acf_reports do |t|
      t.references :company, null: false, foreign_key: true
      t.date :fiscal_date_ending, null: false
      t.string :reported_currency, null: false
      t.decimal :operating_cash_flow, precision: 15, scale: 2, null: false
      t.decimal :depreciation_depletion_and_amortization, precision: 15, scale: 2
      t.decimal :capital_expenditures, precision: 15, scale: 2
      t.decimal :change_in_inventory, precision: 15, scale: 2

      t.timestamps
    end

    add_index :acf_reports, [ :fiscal_date_ending, :company_id ], unique: true
  end
end
