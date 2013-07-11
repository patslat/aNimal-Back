class AddOverallToGame < ActiveRecord::Migration
  def change
    add_column :games, :overall_correct, :integer, :null => false
  end
end
