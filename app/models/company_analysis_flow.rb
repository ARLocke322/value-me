class CompanyAnalysisFlow < ApplicationRecord
  belongs_to :company, optional: true

  state_machine :state, initial: :pending do
    # CALLBACKS
    after_transition to: :fetching_overview do |flow|
      FetchCompanyOverviewJob.perform_later(flow.id)
    end

    after_transition to: :saving_overview do |flow, transition|
      options = transition.args.extract_options!
      SaveCompanyOverviewJob.perform_later(flow.id, options[:response])
    end

    after_transition to: :fetching_cf do |flow|
      FetchCompanyCfJob.perform_later(flow.id)
    end

    after_transition to: :saving_acf_reports do |flow, transition|
      options = transition.args.extract_options!
      SaveCompanyAcfReportsJob.perform_later(flow.id, options[:response])
    end

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

    event :start_fetch_cf do
      transition saved_overview: :fetching_cf
      transition failed_fetch_cf: :fetching_cf
    end

    event :finish_fetch_cf do
      transition fetching_cf: :fetched_cf
    end

    event :fail_fetch_cf do
      transition fetching_cf: :failed_fetch_cf
    end

    event :start_save_acf_reports do
      transition fetched_cf: :saving_acf_reports
      transition failed_save_acf_reports: :saving_acf_reports
    end

    event :finish_save_acf_reports do
      transition saving_acf_reports: :saved_acf_reports
    end

    event :fail_save_acf_reports do
      transition saving_acf_reports: :failed_save_acf_reports
    end
  end
end
