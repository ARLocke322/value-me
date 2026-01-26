Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :companies, only: :index do
        collection do
          get :cash_flows
          get :quote
          post :fetch_company, to: "alphavantage_flows#create"
          post :fetch_cash_flows, to: "alphavantage_flows#start_fetch_cf"
          post :fetch_quote, to: "alphavantage_flows#start_fetch_quote"
          get :flow_status, to: "alphavantage_flows#index"
        end
      end
      resources :alphavantage_flows, only: [ :create, :index ] do
        collection do
          post :start_fetch_cf
          post :start_fetch_quote
        end
      end
    end
  end
end
