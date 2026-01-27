class IncomeStatementSerializer < ActiveModel::Serializer
  # EXCLUDED_ATTRIBUTES = [ :id, :company_id, :created_at, :updated_at ]
  # attributes(*(IncomeStatement.column_names - EXCLUDED_ATTRIBUTES).map(&:to_sym))

  attributes :fiscal_date_ending,
    :reported_currency,
    :gross_profit,
    :total_revenue,
    :cost_of_revenue,
    :cost_of_goods_and_services_sold,
    :operating_income,
    :selling_general_and_administrative,
    :research_and_development,
    :operating_expenses,
    :investment_income_net,
    :net_interest_income,
    :interest_income,
    :interest_expense,
    :non_interest_income,
    :other_non_operating_income,
    :depreciation,
    :depreciation_and_amortization,
    :income_before_tax,
    :income_tax_expense,
    :interest_and_debt_expense,
    :net_income_from_continuing_operations,
    :comprehensive_income_net_of_tax,
    :ebit,
    :ebitda,
    :net_income
end
