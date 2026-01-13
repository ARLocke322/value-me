class CreateCompanyAnalysisFlows < ActiveRecord::Migration[8.1]
  def change
    create_table :company_analysis_flows do |t|
      t.string :state, default: "pending"
      t.string :error_message
      t.references :company, foreign_key: true
      t.string :symbol, null: false

      t.timestamps
    end
  end
end
