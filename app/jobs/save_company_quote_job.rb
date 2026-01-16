class SaveCompanyQuoteJob < ApplicationJob
  queue_as :default

  def perform(flow_id, response)
    CompanyAnalysisFlow.transaction do
      flow = CompanyAnalysisFlow.lock.find(flow_id)
      quote = Quote.upsert(
        {
          company_id: flow.company.id,
          open: response["Global Quote"]["02. open"],
          high: response["Global Quote"]["03. high"],
          low: response["Global Quote"]["04. low"],
          price: response["Global Quote"]["05. price"],
          volume: response["Global Quote"]["06. volume"],
          latest_trading_date: response["Global Quote"]["07. latest trading day"],
          previous_close: response["Global Quote"]["08. previous close"],
          change: response["Global Quote"]["09. change"],
          change_percent: response["Global Quote"]["10. change percent"]
        },
        unique_by: :company_id
      )
      flow.finish_save_quote!
    end
  rescue => e
    flow = CompanyAnalysisFlow.find(flow_id)
    flow.update(error_message: e.message)
    flow.fail_save_quote!
    raise e
  end
end
