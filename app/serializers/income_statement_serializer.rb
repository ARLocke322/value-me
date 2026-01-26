class IncomeStatementSerializer < ActiveModel::Serializer
  EXCLUDED_ATTRIBUTES = [ :company_id, :created_at, :updated_at ]

  attributes(*(IncomeStatement.column_names - EXCLUDED_ATTRIBUTES).map(&:to_sym))
  attribute :ticker

  def ticker
    object.company.ticker
  end
end
