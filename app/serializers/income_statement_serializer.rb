class IncomeStatementSerializer < ActiveModel::Serializer
  EXCLUDED_ATTRIBUTES = [ :id, :company_id, :created_at, :updated_at ]
  attributes(*(IncomeStatement.column_names - EXCLUDED_ATTRIBUTES).map(&:to_sym))
end
