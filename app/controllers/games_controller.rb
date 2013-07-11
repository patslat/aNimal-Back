class GamesController < ApplicationController
  require 'csv'
  # respond_to :json, :csv, :html

  def create
    @user ||= current_user || User.new
    @game = @user.games.build(params[:game])
    @game.save if @user.persisted?
    respond_with @game
  end

  def index
    @data = Game.to_csv # fix so it doesn't reply with all games
    respond_to do |format|
      format.html { render :index }
      format.csv { render :text => @data }
    end


  end
end
