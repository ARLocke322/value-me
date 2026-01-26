class IncomeStatement < ApplicationRecord
  belongs_to :company

  validates :fiscal_date_ending,
    presence: true,
    uniqueness: { scope: :company }

  validates :reported_currency, presence: true
  validates :gross_profit, presence: true
  validates :total_revenue, presence: true

  def self.save_alphavantage_response!(company_id, response)
    response["annualReports"].each do |report|
      record = find_or_initialize_by(
        company_id: company_id,
        fiscal_date_ending: report["fiscalDateEnding"]
      )

      record.assign_attributes(
        reported_currency: report["reportedCurrency"],
        gross_profit: report["grossProfit"],
        total_revenue: report["totalRevenue"],
        cost_of_revenue: report["costOfRevenue"],
        cost_of_goods_and_services_sold: report["costOfGoodsAndServicesSold"],
        operating_income: report["operatingIncome"],
        selling_general_and_administrative: report["sellingGeneralAndAdministrative"],
        research_and_development: report["researchAndDevelopment"],
        operating_expenses: report["operatingExpenses"],
        investment_income_net: report["investmentIncomeNet"],
        net_interest_income: report["netInterestIncome"],
        interest_income: report["interestIncome"],
        interest_expense: report["interestExpense"],
        non_interest_income: report["nonInterestIncome"],
        other_non_operating_income: report["otherNonOperatingIncome"],
        depreciation: report["depreciation"],
        depreciation_and_amortization: report["depreciationAndAmortization"],
        income_before_tax: report["incomeBeforeTax"],
        income_tax_expense: report["incomeTaxExpense"],
        interest_and_debt_expense: report["interestAndDebtExpense"],
        net_income_from_continuing_operations: report["netIncomeFromContinuingOperations"],
        comprehensive_income_net_of_tax: report["comprehensiveIncomeNetOfTax"],
        ebit: report["ebit"],
        ebitda: report["ebitda"],
        net_income: report["netIncome"]
      )

      record.save!
    end
  end
end
