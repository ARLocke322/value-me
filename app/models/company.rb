class Company < ApplicationRecord
  has_one :company_analysis_flow
  has_one :quote

  has_many :acf_reports

  validates :symbol, presence: true, uniqueness: true
  validates :name, presence: true
  validates :currency, presence: true
end
