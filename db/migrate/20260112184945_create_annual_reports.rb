class CreateAnnualReports < ActiveRecord::Migration[8.1]
  def change
    create_table :annual_reports do |t|
      t.references :company, null: false, foreign_key: true
      t.date :fiscal_date_ending, null: false
      t.string :reported_currency, null: false
      t.decimal :operating_cash_flow, null: false
      t.decimal :depreciation_depletion_and_amortization
      t.decimal :capital_expenditures
      t.decimal :change_in_inventory

      t.timestamps
    end

    add_index :annual_reports, [ :fiscal_date_ending, :company ], unique: true
  end
end
