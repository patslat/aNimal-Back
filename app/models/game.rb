class Game < ActiveRecord::Base
  attr_accessible :auditory_correct, :visual_correct, :overall_correct,
    :sequences, :user_id
end
