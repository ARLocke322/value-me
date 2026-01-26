class FetchAlphavantageJob < ApplicationJob
  queue_as :default
  retry_on StandardError,
    wait: :polynomially_longer, attempts: 5 do |job, exception|
      flow ||= AlphavantageFlow.find(job.arguments.first)
      flow.update(error_message: exception.message)
      flow.fail_fetch!
    end

  def perform(flow_id, resource)
    client ||= AlphavantageClient.new
    flow ||= AlphavantageFlow.find(flow_id)
    flow.company ||= Company.create!(symbol: flow.symbol)
    data = client.fetch(resource, flow.symbol)

    flow.finish_fetch!
    flow.start_save!(response: data, resource: resource)
  end
end
