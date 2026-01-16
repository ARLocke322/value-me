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
end
