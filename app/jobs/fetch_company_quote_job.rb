class FetchCompanyQuoteJob < ApplicationJob
  queue_as :default
  retry_on StandardError, wait: :polynomially_longer, attempts: 5 do |job, exception|
    flow = CompanyAnalysisFlow.find(job.arguments.first)
    flow.update(error_message: exception.message)
    flow.fail_fetch_quote!
  end

  def perform(flow_id)
    flow = CompanyAnalysisFlow.find(flow_id)

    conn = Faraday.new(
      url: "https://www.alphavantage.co/query?" \
        "function=GLOBAL_QUOTE&" \
        "symbol=#{flow.symbol}&" \
        "apikey=#{ENV["ALPHAVANTAGE_API_KEY"]}",
    ) do |builder|
      builder.request :json

      builder.response :json
      builder.response :raise_error
    end

    response = conn.get

    if response.body["Global Quote"].blank?
      raise StandardError, "Invalid API response: #{response.body}"
    end

    flow.finish_fetch_quote!
    flow.start_save_quote!(response: response.body)
  end
end
