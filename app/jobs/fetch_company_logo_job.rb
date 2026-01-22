class FetchLogoJob < ApplicationJob
  queue_as :default
  retry_on StandardError,
    wait: :polynomially_longer, attempts: 5 do |job, exception|
      flow ||= CompanyAnalysisFlow.find(job.arguments.first)
      flow.update(error_message: exception.message)
      flow.fail_fetch_cf!
    end

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

    unless response.body["annualReports"].is_a?(Array)
      raise StandardError, "Invalid API respones: #{response.body}"
    end

    flow.finish_fetch_cf!
    flow.start_save_acf_reports!(response: response.body)
  end
end
