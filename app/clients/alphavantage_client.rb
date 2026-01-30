class AlphavantageClient
  BASE_URL = "https://www.alphavantage.co/query"

  def initialize
    @conn = Faraday.new(url: BASE_URL) do |builder|
      builder.request :json

      builder.response :json
      builder.response :raise_error
    end
  end

  def fetch(resource, symbol)
    response = @conn.get do |req|
      req.params["function"] = resource
      req.params["symbol"] = symbol
      req.params["apikey"] = ENV["ALPHAVANTAGE_API_KEY"]
    end

    data = response.body
    raise StandardError, "Invalid API response: #{data}" unless valid_response?(resource, data)
    data
  end

  private
    def valid_response?(resource, data)
      case resource
      when "OVERVIEW" then data.present?
      when "GLOBAL_QUOTE" then data["Global Quote"].present?
      when "CASH_FLOW" then data["annualReports"].is_a?(Array)
      when "INCOME_STATEMENT" then data["annualReports"].is_a?(Array)
      when "BALANCE_SHEET" then data["annualReports"].is_a?(Array)
      else false
      end
    end
end
