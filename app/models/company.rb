class Company < ApplicationRecord
  has_one :alphavantage_flow
  has_one :quote

  has_many :acf_reports
  has_many :income_statements
  has_many :balance_sheets

  validates :symbol, presence: true, uniqueness: true

  def self.save_alphavantage_response!(company_id, response)
    record = find_or_initialize_by(id: company_id)
    record.assign_attributes(
      symbol: response["Symbol"],
      asset_type: response["AssetType"],
      country: response["Country"],
      sector: response["Sector"],
      name: response["Name"],
      currency: response["Currency"]
    )
    record.save!
  end
end
