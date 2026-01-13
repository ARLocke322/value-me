Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :companies, only: :index do
        collection do
          get :cash_flows
        end
      end
      resources :company_analysis_flows, only: [ :create, :index ] do
        collection do
          post :start_fetch_cf
        end
      end
    end
  end
end
