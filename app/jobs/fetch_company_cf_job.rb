class FetchCompanyCfJob < ApplicationJob
  queue_as :default

  def perform(flow_id)
    flow = CompanyAnalysisFlow.find(flow_id)

    conn = Faraday.new(
      url: "https://www.alphavantage.co/query?" \
        "function=CASH_FLOW&" \
        "symbol=#{flow.symbol}&" \
        "apikey=#{ENV["ALPHAVANTAGE_API_KEY"]}",
    ) do |builder|
      builder.request :json

      builder.response :json
      builder.response :raise_error
    end

    response = conn.get()

    flow.finish_fetch_cf!
    flow.start_save_acf_reports!(response: response.body)
  rescue => e
    flow.update(error_message: e.message)
    flow.fail_fetch_cf!
  end
end
