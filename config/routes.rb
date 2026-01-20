Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :companies, only: :index do
        collection do
          get :cash_flows
          get :quote
          post :fetch_company, to: "company_analysis_flows#create"
          post :fetch_cash_flows, to: "company_analysis_flows#start_fetch_cf"
          post :fetch_quote, to: "company_analysis_flows#start_fetch_quote"
          get :flow_status, to: "company_analysis_flows#index"
        end
      end
      resources :company_analysis_flows, only: [ :create, :index ] do
        collection do
          post :start_fetch_cf
          post :start_fetch_quote
        end
      end
    end
  end
end
