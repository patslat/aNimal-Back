Nback::Application.routes.draw do
  root :to => "root#root"
  get '/auth/:provider/callback', to: 'sessions#create'
end
