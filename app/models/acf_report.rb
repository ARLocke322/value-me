class AcfReport < ApplicationRecord
  belongs_to :company

  validates :fiscal_date_ending,
    presence: true,
    uniqueness: { scope: :company }

  validates :reported_currency, presence: true
  validates :operating_cash_flow, presence: true
end
