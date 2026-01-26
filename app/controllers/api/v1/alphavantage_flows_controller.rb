class Api::V1::AlphavantageFlowsController < ApplicationController
  def create
    flow = AlphavantageFlow.new(symbol: params[:symbol])
    if flow.save
      flow.start_fetch!(resource: "OVERVIEW")
      render json: format_flow(flow), status: :created
    else
      render json: { errors: flow.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    flow = AlphavantageFlow.find_by!(symbol: params[:symbol])
    render json: format_flow(flow), status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Flow not found" }, status: :not_found
  end

  def start_fetch_quote
    flow = AlphavantageFlow.find_by!(symbol: params[:symbol])
    flow.start_fetch!(resource: "GLOBAL_QUOTE")
    render json: format_flow(flow), status: :ok
  rescue StateMachines::InvalidTransition
    render json: { error: "Cannot fetch quote" }, status: :conflict
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Flow not found" }, status: :not_found
  end

  def start_fetch_cf
    flow = AlphavantageFlow.find_by!(symbol: params[:symbol])
    flow.start_fetch!(resource: "CASH_FLOW")
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
