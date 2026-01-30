# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_01_30_150525) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "acf_reports", force: :cascade do |t|
    t.decimal "capital_expenditures", precision: 15, scale: 2
    t.decimal "change_in_inventory", precision: 15, scale: 2
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.decimal "depreciation_depletion_and_amortization", precision: 15, scale: 2
    t.date "fiscal_date_ending", null: false
    t.decimal "operating_cash_flow", precision: 15, scale: 2, null: false
    t.string "reported_currency", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_acf_reports_on_company_id"
    t.index ["fiscal_date_ending", "company_id"], name: "index_acf_reports_on_fiscal_date_ending_and_company_id", unique: true
  end

  create_table "alphavantage_flows", force: :cascade do |t|
    t.bigint "company_id"
    t.datetime "created_at", null: false
    t.string "error_message"
    t.string "state", default: "pending"
    t.string "symbol", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_alphavantage_flows_on_company_id"
  end

  create_table "balance_sheets", force: :cascade do |t|
    t.decimal "accumulated_depreciation_amortization_ppe", precision: 15, scale: 2
    t.decimal "capital_lease_obligations", precision: 15, scale: 2
    t.decimal "cash_and_cash_equivalents_at_carrying_value", precision: 15, scale: 2
    t.decimal "cash_and_short_term_investments", precision: 15, scale: 2
    t.decimal "common_stock", precision: 15, scale: 2
    t.bigint "common_stock_shares_outstanding"
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.decimal "current_accounts_payable", precision: 15, scale: 2
    t.decimal "current_debt", precision: 15, scale: 2
    t.decimal "current_long_term_debt", precision: 15, scale: 2
    t.decimal "current_net_receivables", precision: 15, scale: 2
    t.decimal "deferred_revenue", precision: 15, scale: 2
    t.date "fiscal_date_ending", null: false
    t.decimal "goodwill", precision: 15, scale: 2
    t.decimal "intangible_assets", precision: 15, scale: 2
    t.decimal "intangible_assets_excluding_goodwill", precision: 15, scale: 2
    t.decimal "inventory", precision: 15, scale: 2
    t.decimal "investments", precision: 15, scale: 2
    t.decimal "long_term_debt", precision: 15, scale: 2
    t.decimal "long_term_debt_noncurrent", precision: 15, scale: 2
    t.decimal "long_term_investments", precision: 15, scale: 2
    t.decimal "other_current_assets", precision: 15, scale: 2
    t.decimal "other_current_liabilities", precision: 15, scale: 2
    t.decimal "other_non_current_assets", precision: 15, scale: 2
    t.decimal "other_non_current_liabilities", precision: 15, scale: 2
    t.decimal "property_plant_equipment", precision: 15, scale: 2
    t.string "reported_currency", null: false
    t.decimal "retained_earnings", precision: 15, scale: 2
    t.decimal "short_long_term_debt_total", precision: 15, scale: 2
    t.decimal "short_term_debt", precision: 15, scale: 2
    t.decimal "short_term_investments", precision: 15, scale: 2
    t.decimal "total_assets", precision: 15, scale: 2
    t.decimal "total_current_assets", precision: 15, scale: 2
    t.decimal "total_current_liabilities", precision: 15, scale: 2
    t.decimal "total_liabilities", precision: 15, scale: 2
    t.decimal "total_non_current_assets", precision: 15, scale: 2
    t.decimal "total_non_current_liabilities", precision: 15, scale: 2
    t.decimal "total_shareholder_equity", precision: 15, scale: 2
    t.decimal "treasury_stock", precision: 15, scale: 2
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_balance_sheets_on_company_id"
    t.index ["fiscal_date_ending", "company_id"], name: "index_balance_sheets_on_fiscal_date_ending_and_company_id", unique: true
  end

  create_table "companies", force: :cascade do |t|
    t.string "asset_type"
    t.string "country"
    t.datetime "created_at", null: false
    t.string "currency"
    t.string "name"
    t.string "sector"
    t.string "symbol", null: false
    t.datetime "updated_at", null: false
    t.index ["symbol"], name: "index_companies_on_symbol", unique: true
  end

  create_table "income_statements", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.decimal "comprehensive_income_net_of_tax", precision: 15, scale: 2
    t.decimal "cost_of_goods_and_services_sold", precision: 15, scale: 2
    t.decimal "cost_of_revenue", precision: 15, scale: 2
    t.datetime "created_at", null: false
    t.decimal "depreciation", precision: 15, scale: 2
    t.decimal "depreciation_and_amortization", precision: 15, scale: 2
    t.decimal "ebit", precision: 15, scale: 2
    t.decimal "ebitda", precision: 15, scale: 2
    t.date "fiscal_date_ending", null: false
    t.decimal "gross_profit", precision: 15, scale: 2, null: false
    t.decimal "income_before_tax", precision: 15, scale: 2
    t.decimal "income_tax_expense", precision: 15, scale: 2
    t.decimal "interest_and_debt_expense", precision: 15, scale: 2
    t.decimal "interest_expense", precision: 15, scale: 2
    t.decimal "interest_income", precision: 15, scale: 2
    t.decimal "investment_income_net", precision: 15, scale: 2
    t.decimal "net_income", precision: 15, scale: 2
    t.decimal "net_income_from_continuing_operations", precision: 15, scale: 2
    t.decimal "net_interest_income", precision: 15, scale: 2
    t.decimal "non_interest_income", precision: 15, scale: 2
    t.decimal "operating_expenses", precision: 15, scale: 2
    t.decimal "operating_income", precision: 15, scale: 2
    t.decimal "other_non_operating_income", precision: 15, scale: 2
    t.string "reported_currency", null: false
    t.decimal "research_and_development", precision: 15, scale: 2
    t.decimal "selling_general_and_administrative", precision: 15, scale: 2
    t.decimal "total_revenue", precision: 15, scale: 2, null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_income_statements_on_company_id"
    t.index ["fiscal_date_ending", "company_id"], name: "index_income_statements_on_fiscal_date_ending_and_company_id", unique: true
  end

  create_table "quotes", force: :cascade do |t|
    t.decimal "change", precision: 12, scale: 2
    t.decimal "change_percent", precision: 8, scale: 4
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.decimal "high", precision: 12, scale: 2
    t.date "latest_trading_date"
    t.decimal "low", precision: 12, scale: 2
    t.decimal "open", precision: 12, scale: 2
    t.decimal "previous_close", precision: 12, scale: 2
    t.decimal "price", precision: 12, scale: 2
    t.datetime "updated_at", null: false
    t.decimal "volume", precision: 15
    t.index ["company_id"], name: "index_quotes_on_company_id", unique: true
  end

  add_foreign_key "acf_reports", "companies"
  add_foreign_key "alphavantage_flows", "companies"
  add_foreign_key "balance_sheets", "companies"
  add_foreign_key "income_statements", "companies"
  add_foreign_key "quotes", "companies"
end
