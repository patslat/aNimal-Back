Nback::Application.routes.draw do
  devise_for :users, :controllers => {
    :omniauth_callbacks => 'users/omniauth_callbacks'
  }

  root :to => "root#root"
  resources :games, :only => [:create, :show]
end
