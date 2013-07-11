class Game < ActiveRecord::Base
  attr_accessible :auditory_correct, :visual_correct, :overall_correct,
    :sequences, :user_id

  def self.to_csv
    CSV.generate do |csv|
      csv << column_names
      all.each do |data|
        csv << data.attributes.values_at(*column_names)
      end
    end
  end
end
