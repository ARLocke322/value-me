class Api::V1::CompanyAnalysisFlowsController < ApplicationController
  def create
    flow = CompanyAnalysisFlow.new(symbol: params[:symbol])
    if flow.save
      flow.start_fetch_overview!
      render json: format_flow(flow), status: :created
    else
      render json: { errors: flow.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    flow = CompanyAnalysisFlow.find_by!(symbol: params[:symbol])
    render json: format_flow(flow), status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Flow not found" }, status: :not_found
  end

  def start_fetch_cf
    flow = CompanyAnalysisFlow.find_by!(symbol: params[:symbol])
    flow.start_fetch_cf!
    render json: format_flow(flow), status: :ok
  rescue StateMachines::InvalidTransition
    render json: { error: "Cannot fetch cash flows" }, status: :conflict
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Flow not found" }, status: :not_found
  end

  private
    def flow_params
      params.require(:flow).permit(:symbol)
    end

    def format_flow(flow)
      {
        id: flow.id,
        symbol: flow.symbol,
        state: flow.state
      }
    end
end
