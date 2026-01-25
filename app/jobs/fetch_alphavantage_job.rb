class FetchAlphavantageJob < ApplicationJob
  queue_as :default
  retry_on StandardError,
    wait: :polynomially_longer, attempts: 5 do |job, exception|
      flow ||= CompanyAnalysisFlow.find(job.arguments.first)
      flow.update(error_message: exception.message)
      flow.fail_alphavantage_fetch!
    end

  def perform(flow_id, resource)
    client ||= AlphavantageClient.new
    flow = CompanyAnalysisFlow.find(flow_id)
    data = client.fetch(resource, flow.symbol)

    flow.finish_alphavantage_fetch!
    flow.start_alphavantage_save!(response: data)
  end
end
