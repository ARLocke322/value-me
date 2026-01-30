class BalanceSheet < ApplicationRecord
  belongs_to :company

  validates :fiscal_date_ending,
    presence: true,
    uniqueness: { scope: :company }

  validates :reported_currency, presence: true

  def self.save_alphavantage_response!(company_id, response)
    response["annualReports"].each do |report|
      record = find_or_initialize_by(
        company_id: company_id,
        fiscal_date_ending: report["fiscalDateEnding"]
      )

      record.assign_attributes(
        reported_currency: report["reportedCurrency"],
        total_assets: report["totalAssets"],
        total_current_assets: report["totalCurrentAssets"],
        cash_and_cash_equivalents_at_carrying_value: report["cashAndCashEquivalentsAtCarryingValue"],
        cash_and_short_term_investments: report["cashAndShortTermInvestments"],
        inventory: report["inventory"],
        current_net_receivables: report["currentNetReceivables"],
        total_non_current_assets: report["totalNonCurrentAssets"],
        property_plant_equipment: report["propertyPlantEquipment"],
        accumulated_depreciation_amortization_ppe: report["accumulatedDepreciationAmortizationPpe"],
        intangible_assets: report["intangibleAssets"],
        intangible_assets_excluding_goodwill: report["intangibleAssetsExcludingGoodwill"],
        goodwill: report["goodwill"],
        investments: report["investments"],
        long_term_investments: report["longTermInvestments"],
        short_term_investments: report["shortTermInvestments"],
        other_current_assets: report["otherCurrentAssets"],
        other_non_current_assets: report["otherNonCurrentAssets"],
        total_liabilities: report["totalLiabilities"],
        total_current_liabilities: report["totalCurrentLiabilities"],
        current_accounts_payable: report["currentAccountsPayable"],
        deferred_revenue: report["deferredRevenue"],
        current_debt: report["currentDebt"],
        short_term_debt: report["shortTermDebt"],
        total_non_current_liabilities: report["totalNonCurrentLiabilities"],
        capital_lease_obligations: report["capitalLeaseObligations"],
        long_term_debt: report["longTermDebt"],
        current_long_term_debt: report["currentLongTermDebt"],
        long_term_debt_noncurrent: report["longTermDebtNoncurrent"],
        short_long_term_debt_total: report["short_longTermDebtTotal"],
        other_current_liabilities: report["otherCurrentLiabilities"],
        other_non_current_liabilities: report["otherNonCurrentLiabilities"],
        total_shareholder_equity: report["totalShareholderEquity"],
        treasury_stock: report["treasuryStock"],
        retained_earnings: report["retainedEarnings"],
        common_stock: report["commonStock"],
        common_stock_shares_outstanding: report["commonStockSharesOutstanding"],
      )

      record.save!
    end
  end
end
