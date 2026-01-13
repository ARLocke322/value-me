class Api::V1::CompanyAnalysisFlowsController < ApplicationController
  def create
    flow = CompanyAnalysisFlow.new(flow_params)
    if flow.save
      flow.start_fetch_overview!
      render json: {
        id: flow.id,
        symbol: flow.symbol,
        state: flow.state
      }, status: :created
    else
      render json: { errors: flow.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    flow = CompanyAnalysisFlow.find(params[:id])
    render json: {
      id: flow.id,
      symbol: flow.symbol,
      state: flow.state
    }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Flow not found" }, status: :not_found
  end

  private
    def flow_params
      params.require(:flow).permit(:symbol)
    end
end
