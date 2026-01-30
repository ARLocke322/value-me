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

  def cash_flows
    company = Company.includes(:acf_reports).find_by!(symbol: params[:symbol])

    if company.acf_reports.any?
      render json: {
        symbol: company.symbol,
        acf_reports: company.acf_reports
          .order(fiscal_date_ending: :desc)
          .index_by { |r| r.fiscal_date_ending.year }
          .transform_values { |r| format_acf_report(r) }
      }, status: :ok
    else
      render json: {
        message: "No cash flows found. Please trigger fetch cash flows."
      }, status: :not_found
    end
  rescue ActiveRecord::RecordNotFound
    render json: {
      error: "Company not found"
    }, status: :not_found
  end

  def income_statements
    company = Company.includes(:income_statements).find_by!(symbol: params[:symbol])

    if company.income_statements.any?
      render json: company,
        status: :ok
    else
      render json: {
        message: "No income statement found. Please trigger fetch income statement."
      }, status: :not_found
    end
  rescue ActiveRecord::RecordNotFound
    render json: {
      error: "Company not found"
    }, status: :not_found
  end

  def balance_sheets
    company = Company.includes(:balance_sheets).find_by!(symbol: params[:symbol])

    if company.balance_sheets.any?
      render json: company,
        status: :ok
    else
      render json: {
        message: "No balance sheets found. Please trigger fetch income statement."
      }, status: :not_found
    end
  rescue ActiveRecord::RecordNotFound
    render json: {
      error: "Company not found"
    }, status: :not_found
  end

  def quote
    company = Company.find_by!(symbol: params[:symbol])
    quote = company.quote
    if quote.present?
      render json: {
        symbol: company.symbol,
        quote: {
          open: quote[:open],
          high: quote[:high],
          low: quote[:low],
          volume: quote[:volume],
          latest_trading_date: quote[:latest_trading_date],
          previous_close: quote[:previous_close],
          change: quote[:change],
          change_percent: quote[:change_percent]
        }
      }
    else
      render json: {
        message: "No quote found."
      }, status: :not_found
    end
  rescue ActiveRecord::RecordNotFound
    render json: {
      error: "Company not found"
    }, status: :not_found
  end


  private
    def format_acf_report(report)
      {
        operating_cash_flow: report.operating_cash_flow,
        depreciation_depletion_and_amortization: report.depreciation_depletion_and_amortization,
        capital_expenditures: report.capital_expenditures,
        change_in_inventory: report.change_in_inventory,
        reported_currency: report.reported_currency
      }
    end
end
