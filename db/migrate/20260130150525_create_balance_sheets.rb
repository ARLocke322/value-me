class CreateBalanceSheets < ActiveRecord::Migration[8.1]
  def change
    create_table :balance_sheets do |t|
      t.references :company, null: false, foreign_key: true
      t.date :fiscal_date_ending, null: false
      t.string :reported_currency, null: false
      t.decimal :total_assets, precision: 15, scale: 2
      t.decimal :total_current_assets, precision: 15, scale: 2
      t.decimal :cash_and_cash_equivalents_at_carrying_value, precision: 15, scale: 2
      t.decimal :cash_and_short_term_investments, precision: 15, scale: 2
      t.decimal :inventory, precision: 15, scale: 2
      t.decimal :current_net_receivables, precision: 15, scale: 2
      t.decimal :total_non_current_assets, precision: 15, scale: 2
      t.decimal :property_plant_equipment, precision: 15, scale: 2
      t.decimal :accumulated_depreciation_amortization_ppe, precision: 15, scale: 2
      t.decimal :intangible_assets, precision: 15, scale: 2
      t.decimal :intangible_assets_excluding_goodwill, precision: 15, scale: 2
      t.decimal :goodwill, precision: 15, scale: 2
      t.decimal :investments, precision: 15, scale: 2
      t.decimal :long_term_investments, precision: 15, scale: 2
      t.decimal :short_term_investments, precision: 15, scale: 2
      t.decimal :other_current_assets, precision: 15, scale: 2
      t.decimal :other_non_current_assets, precision: 15, scale: 2
      t.decimal :total_liabilities, precision: 15, scale: 2
      t.decimal :total_current_liabilities, precision: 15, scale: 2
      t.decimal :current_accounts_payable, precision: 15, scale: 2
      t.decimal :deferred_revenue, precision: 15, scale: 2
      t.decimal :current_debt, precision: 15, scale: 2
      t.decimal :short_term_debt, precision: 15, scale: 2
      t.decimal :total_non_current_liabilities, precision: 15, scale: 2
      t.decimal :capital_lease_obligations, precision: 15, scale: 2
      t.decimal :long_term_debt, precision: 15, scale: 2
      t.decimal :current_long_term_debt, precision: 15, scale: 2
      t.decimal :long_term_debt_noncurrent, precision: 15, scale: 2
      t.decimal :short_long_term_debt_total, precision: 15, scale: 2
      t.decimal :other_current_liabilities, precision: 15, scale: 2
      t.decimal :other_non_current_liabilities, precision: 15, scale: 2
      t.decimal :total_shareholder_equity, precision: 15, scale: 2
      t.decimal :treasury_stock, precision: 15, scale: 2
      t.decimal :retained_earnings, precision: 15, scale: 2
      t.decimal :common_stock, precision: 15, scale: 2
      t.bigint :common_stock_shares_outstanding

      t.timestamps
    end

    add_index :balance_sheets, [ :fiscal_date_ending, :company_id ], unique: true
  end
end
