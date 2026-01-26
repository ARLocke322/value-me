class AlphavantageFlow < ApplicationRecord
  belongs_to :company, optional: true

  state_machine :state, initial: :pending do
    # --- CALLBACKS ---

    after_transition to: :fetching do |flow, transition|
      options = transition.args.extract_options!
      FetchAlphavantageJob.perform_later(flow.id, options[:resource])
    end

    after_transition to: :saving do |flow, transition|
      options = transition.args.extract_options!
      SaveAlphavantageJob.perform_later(flow.id, options[:response], options[:resource])
    end

    # after_transition to: [ :failed_fetch, :failed_save ] do |flow, transition|
    #  options = transition.args.extract_options!
    #  update(error_message: options[:error].message)
    # end

    # --- EVENTS ---

    event :start_fetch do
      transition [ :pending, :failed_fetch, :saved, :failed_save ] => :fetching
    end

    event :finish_fetch do
      transition fetching: :fetched
    end

    event :fail_fetch do
      transition fetching: :failed_fetch
    end

    event :start_save do
      transition [ :fetched, :failed_save ] => :saving
    end

    event :finish_save do
      transition saving: :saved
    end

    event :fail_save do
      transition saving: :failed_save
    end
  end
end
