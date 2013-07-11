class GamesController < ApplicationController
  respond_to :json
  def create
    @user ||= current_user || User.new
    @game = @user.games.build(params[:game])
    @game.save if @user.persisted?
    respond_with @game
  end
end
