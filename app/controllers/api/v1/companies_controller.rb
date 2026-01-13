class Api::V1::CompaniesController < ApplicationController
  def index
    company = Company.find_by!(symbol: params[:symbol])
    render json: {
      symbol: company.symbol,
      name: company.name,
      country: company.country,
      currency: company.currency,
      sector: company.sector,
      asset_type: company.asset_type
    }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Company not found" }, status: :not_found
  end
end
