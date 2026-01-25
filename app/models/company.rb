class Company < ApplicationRecord
  has_one :company_analysis_flow
  has_one :quote

  has_many :acf_reports

  validates :symbol, presence: true, uniqueness: true

  def save_alphavantage_response!(response)
    update!(
      symbol: response["Symbol"],
      asset_type: response["AssetType"],
      country: response["Country"],
      sector: response["Sector"],
      name: response["Name"],
      currency: response["Currency"]
    )
  end
end
