class FetchCompanyIsJob < ApplicationJob
  queue_as :default

  def perform
    conn = Faraday.new(
      url: "https://www.alphavantage.co/query?" \
        "function=INCOME_STATEMENT&" \
        "symbol=KO&" \
        "apikey=#{ENV["ALPHAVANTAGE_API_KEY"]}",
    ) do |builder|
      builder.request :json

      builder.response :json
      builder.response :raise_error
    end

    response = conn.get()
    pp response.body["annualReports"][3]
  end
end
