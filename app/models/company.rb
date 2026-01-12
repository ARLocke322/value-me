class Company < ApplicationRecord
  has_many :annual_reports

  validates :symbol, presence: true, uniqueness: true
  validates :name, presence: true
  validates :currency, presence: true
end
