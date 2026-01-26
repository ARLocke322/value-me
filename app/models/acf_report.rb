class AcfReport < ApplicationRecord
  belongs_to :company

  validates :fiscal_date_ending,
    presence: true,
    uniqueness: { scope: :company }

  validates :reported_currency, presence: true
  validates :operating_cash_flow, presence: true

  def self.save_alphavantage_response!(company_id, response)
    response["annualReports"].each do |report|
      create!(
        company_id: company_id,
        fiscal_date_ending: report["fiscalDateEnding"],
        reported_currency: report["reportedCurrency"],
        operating_cash_flow: report["operatingCashflow"],
        depreciation_depletion_and_amortization: report["depreciationDepletionAndAmortization"],
        capital_expenditures: report["capitalExpenditures"],
        change_in_inventory: report["changeInInventory"],
      )
    end
  end
end
