Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :companies, only: :index do
        collection do
          get :cash_flows
          get :quote
          get :income_statements
          get :balance_sheets
          post :fetch_company, to: "alphavantage_flows#create"
          post :fetch_cash_flows, to: "alphavantage_flows#start_fetch_cf"
          post :fetch_quote, to: "alphavantage_flows#start_fetch_quote"
          post :fetch_income_statements, to: "alphavantage_flows#start_fetch_income_statements"
          post :fetch_balance_sheets, to: "alphavantage_flows#start_fetch_balance_sheets"
          get :flow_status, to: "alphavantage_flows#index"
        end
      end
      resources :alphavantage_flows, only: [ :create, :index ] do
        collection do
          post :start_fetch_cf
          post :start_fetch_quote
          post :start_fetch_income_statements
          post :start_fetch_balance_sheets
        end
      end
    end
  end
end
