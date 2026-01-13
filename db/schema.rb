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

ActiveRecord::Schema[8.1].define(version: 2026_01_12_194314) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "acf_reports", force: :cascade do |t|
    t.decimal "capital_expenditures"
    t.decimal "change_in_inventory"
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.decimal "depreciation_depletion_and_amortization"
    t.date "fiscal_date_ending", null: false
    t.decimal "operating_cash_flow", null: false
    t.string "reported_currency", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_acf_reports_on_company_id"
    t.index ["fiscal_date_ending", "company_id"], name: "index_acf_reports_on_fiscal_date_ending_and_company_id", unique: true
  end

  create_table "companies", force: :cascade do |t|
    t.string "asset_type"
    t.string "country"
    t.datetime "created_at", null: false
    t.string "currency", null: false
    t.string "name", null: false
    t.string "sector"
    t.string "symbol", null: false
    t.datetime "updated_at", null: false
    t.index ["symbol"], name: "index_companies_on_symbol", unique: true
  end

  create_table "company_analysis_flows", force: :cascade do |t|
    t.bigint "company_id"
    t.datetime "created_at", null: false
    t.string "error_message"
    t.string "state", default: "pending"
    t.string "symbol", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_company_analysis_flows_on_company_id"
  end

  add_foreign_key "acf_reports", "companies"
  add_foreign_key "company_analysis_flows", "companies"
end
