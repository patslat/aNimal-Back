Nback::Application.routes.draw do
  devise_for :users

  root :to => "root#root"
  get '/auth/:provider/callback', to: 'sessions#create'
end
