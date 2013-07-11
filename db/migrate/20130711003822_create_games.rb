class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :auditory_correct, :null => false
      t.integer :visual_correct, :null => false
      t.integer :sequences, :null => false
      t.integer :user_id, :null => false

      t.timestamps
    end
  end
end
