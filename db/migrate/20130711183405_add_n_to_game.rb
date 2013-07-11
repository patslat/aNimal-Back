class AddNToGame < ActiveRecord::Migration
  def change
    add_column :games, :n, :integer, :null => false
  end
end
