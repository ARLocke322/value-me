class CompanySerializer < ActiveModel::Serializer
  attributes :symbol

  has_many :income_statements
  has_many :acf_reports, key: :cash_flows
  has_one :quote
end
