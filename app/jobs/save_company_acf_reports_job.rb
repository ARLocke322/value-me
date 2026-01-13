class SaveCompanyAcfReportsJob < ApplicationJob
  queue_as :default

  def perform(flow_id, response)
    CompanyAnalysisFlow.transaction do
      flow = CompanyAnalysisFlow.lock.find(flow_id)

      reports = response["annualReports"]
      raise "Empty response" unless reports.is_a?(Array)

      reports.each do |report|
        AcfReport.create!(
          company: flow.company,
          fiscal_date_ending: report["fiscalDateEnding"],
          reported_currency: report["reportedCurrency"],
          operating_cash_flow: report["operatingCashflow"],
          depreciation_depletion_and_amortization: report["depreciationDepletionAndAmortization"],
          capital_expenditures: report["capitalExpenditures"],
          change_in_inventory: report["changeInInventory"],
        )
      end
      flow.finish_save_acf_reports!
    end

  rescue => e
    flow = CompanyAnalysisFlow.find(flow_id)
    flow.update(error_message: e.message)
    flow.fail_save_acf_reports!
    raise e
  end
end
