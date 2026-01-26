Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :companies, only: :index do
        collection do
          get :cash_flows
          get :quote
          get :income_statements
          post :fetch_company, to: "alphavantage_flows#create"
          post :fetch_cash_flows, to: "alphavantage_flows#start_fetch_cf"
          post :fetch_quote, to: "alphavantage_flows#start_fetch_quote"
          post :fetch_income_statements, to: "alphavantage_flows#start_fetch_income_statements"
          get :flow_status, to: "alphavantage_flows#index"
        end
      end
      resources :alphavantage_flows, only: [ :create, :index ] do
        collection do
          post :start_fetch_cf
          post :start_fetch_quote
          post :start_fetch_income_statements
        end
      end
    end
  end
end
