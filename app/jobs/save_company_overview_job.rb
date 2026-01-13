class SaveCompanyOverviewJob < ApplicationJob
  queue_as :default

  def perform(flow_id, response)
    flow = CompanyAnalysisFlow.find(flow_id)

    company = Company.create!(
      symbol: response["Symbol"],
      asset_type: response["AssetType"],
      country: response["Country"],
      sector: response["Sector"],
      name: response["Name"],
      currency: response["Currency"]
    )
    flow.update!(company: company)

    flow.finish_save_overview!

  rescue => e
    pp e
    flow.error_message = e.message
    flow.fail_save_overview!
  end
end
