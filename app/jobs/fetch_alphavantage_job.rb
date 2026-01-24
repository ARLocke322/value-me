class FetchAlphavantageJob < ApplicationJob
  queue_as :default
  retry_on StandardError,
    wait: :polynomially_longer, attempts: 5 do |job, exception|
      flow ||= CompanyAnalysisFlow.find(job.arguments.first)
      flow.update(error_message: exception.message)
      flow.fail_alphavantage_fetch!
    end

  def perform(flow_id, resource)
    flow = CompanyAnalysisFlow.find(flow_id)

    conn = Faraday.new(
      url: "https://www.alphavantage.co/query?" \
        "function=#{resource}&" \
        "symbol=#{flow.symbol}&" \
        "apikey=#{ENV["ALPHAVANTAGE_API_KEY"]}",
    ) do |builder|
      builder.request :json

      builder.response :json
      builder.response :raise_error
    end

    response = conn.get()

    unless parse_alphavantage_response(resource, response)
      raise StandardError, "Invalid API respones: #{response.body}"
    end

    flow.finish_alphavantage_fetch!
    flow.start_alphavantage_save!(response: response.body)
  end
end
