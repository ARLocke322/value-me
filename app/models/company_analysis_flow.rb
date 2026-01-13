class CompanyAnalysisFlow < ApplicationRecord
  belongs_to :company, optional: true

  state_machine :state, initial: :pending do
    # EVENTS
    event :start_fetch_overview do
      transition pending: :fetching_overview
      transition failed_fetch_overview: :fetching_overview
    end

    event :finish_fetch_overview do
      transition fetching_overview: :fetched_overview
    end

    event :fail_fetch_overview do
      transition fetching_overview: :failed_fetch_overview
    end

    event :start_save_overview do
      transition fetched_overview: :saving_overview
      transition failed_save_overview: :saving_overview
    end

    event :finish_save_overview do
      transition saving_overview: :saved_overview
    end

    event :fail_save_overview do
      transition saving_overview: :failed_save_overview
    end

    # CALLBACKS
    after_transition from: :pending, to: :fetching_overview do |flow|
      FetchCompanyOverviewJob.perform_later(flow.id)
    end

    after_transition from: :fetched_overview, to: :saving_overview do |flow, transition|
      # options = transition.args.last.is_a?(Hash) ? transition.args.pop : {}
      options = transition.args.extract_options!
      SaveCompanyOverviewJob.perform_later(flow.id, options[:response])
    end
  end
end
