class CompanySerializer < ActiveModel::Serializer
  attributes :symbol

  has_many :income_statements, if: -> { association_loaded?(:income_statements) }
  has_many :balance_sheets, if: -> { association_loaded?(:balance_sheets) }
  has_many :acf_reports, key: :cash_flows, if: -> { association_loaded?(:acf_reports) }
  has_one  :quote, if: -> { association_loaded?(:quote) }

  private

  def association_loaded?(name)
    object.association(name).loaded?
  end
end
