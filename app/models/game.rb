class Game < ActiveRecord::Base
  attr_accessible :auditory_correct, :visual_correct, :overall_correct,
    :sequences, :user_id, :n
end

class Array
  # monkey patch array to allow any set of game data to be rendered as csv
  def to_csv
    CSV.generate do |csv|
      attr_names = Game.attribute_names
      csv << attr_names
      each do |data|
        csv << data.attributes.values_at(*attr_names)
      end
    end
  end
end