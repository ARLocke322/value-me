class Quote < ApplicationRecord
  belongs_to :company

  validates :open, presence: true
  validates :high, presence: true
  validates :low, presence: true
  validates :volume, presence: true
  validates :latest_trading_date, presence: true
  validates :previous_close, presence: true
  validates :change, presence: true
  validates :change_percent, presence: true

  def self.save_alphavantage_response!(company_id, response)
    record = find_or_initialize_by(company_id: company_id)
    record.assign_attributes(
      company_id: company_id,
      open: response["Global Quote"]["02. open"],
      high: response["Global Quote"]["03. high"],
      low: response["Global Quote"]["04. low"],
      price: response["Global Quote"]["05. price"],
      volume: response["Global Quote"]["06. volume"],
      latest_trading_date: response["Global Quote"]["07. latest trading day"],
      previous_close: response["Global Quote"]["08. previous close"],
      change: response["Global Quote"]["09. change"],
      change_percent: response["Global Quote"]["10. change percent"]
    )
    record.save!
  end
end
