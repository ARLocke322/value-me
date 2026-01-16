class SaveCompanyOverviewJob < ApplicationJob
  queue_as :default

  def perform(flow_id, response)
    CompanyAnalysisFlow.transaction do
      flow = CompanyAnalysisFlow.lock.find(flow_id)

      flow.company.update!(
        symbol: response["Symbol"],
        asset_type: response["AssetType"],
        country: response["Country"],
        sector: response["Sector"],
        name: response["Name"],
        currency: response["Currency"]
      )

      flow.finish_save_overview!
      flow.start_fetch_quote!
    end

  rescue => e
    flow = CompanyAnalysisFlow.find(flow_id)
    flow.update(error_message: e.message)
    flow.fail_save_overview!
    raise e
  end
end
