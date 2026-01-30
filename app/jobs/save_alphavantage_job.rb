class SaveAlphavantageJob < ApplicationJob
  queue_as :default

  ALLOWED_MODELS = {
    "GLOBAL_QUOTE" => Quote,
    "OVERVIEW" => Company,
    "CASH_FLOW" => AcfReport,
    "INCOME_STATEMENT" => IncomeStatement,
    "BALANCE_SHEET" => BalanceSheet
  }.freeze

  def perform(flow_id, response, resource)
    flow = AlphavantageFlow.find(flow_id)
    model = ALLOWED_MODELS.fetch(resource)

    AlphavantageFlow.transaction do
      flow.lock!
      model.save_alphavantage_response!(flow.company_id, response)
      flow.finish_save!
    end

  rescue => e
    flow&.update(error_message: e.message)
    flow&.fail_save!
    raise e
  end
end
