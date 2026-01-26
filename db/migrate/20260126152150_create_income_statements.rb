class CreateIncomeStatements < ActiveRecord::Migration[8.1]
  def change
    create_table :income_statements do |t|
      t.references :company, null: false, foreign_key: true
      t.date :fiscal_date_ending, null: false
      t.string :reported_currency, null: false
      t.decimal :gross_profit, precision: 15, scale: 2, null: false
      t.decimal :total_revenue, precision: 15, scale: 2, null: false
      t.decimal :cost_of_revenue, precision: 15, scale: 2
      t.decimal :cost_of_goods_and_services_sold, precision: 15, scale: 2
      t.decimal :operating_income, precision: 15, scale: 2
      t.decimal :selling_general_and_administrative, precision: 15, scale: 2
      t.decimal :research_and_development, precision: 15, scale: 2
      t.decimal :operating_expenses, precision: 15, scale: 2
      t.decimal :investment_income_net, precision: 15, scale: 2
      t.decimal :net_interest_income, precision: 15, scale: 2
      t.decimal :interest_income, precision: 15, scale: 2
      t.decimal :interest_expense, precision: 15, scale: 2
      t.decimal :non_interest_income, precision: 15, scale: 2
      t.decimal :other_non_operating_income, precision: 15, scale: 2
      t.decimal :depreciation, precision: 15, scale: 2
      t.decimal :depreciation_and_amortization, precision: 15, scale: 2
      t.decimal :income_before_tax, precision: 15, scale: 2
      t.decimal :income_tax_expense, precision: 15, scale: 2
      t.decimal :interest_and_debt_expense, precision: 15, scale: 2
      t.decimal :net_income_from_continuing_operations, precision: 15, scale: 2
      t.decimal :comprehensive_income_net_of_tax, precision: 15, scale: 2
      t.decimal :ebit, precision: 15, scale: 2
      t.decimal :ebitda, precision: 15, scale: 2
      t.decimal :net_income, precision: 15, scale: 2

      t.timestamps
    end

    add_index :income_statements, [ :fiscal_date_ending, :company_id ], unique: true
  end
end
