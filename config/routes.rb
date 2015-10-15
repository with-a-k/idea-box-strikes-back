Rails.application.routes.draw do
  get 'ideas/edit'

  namespace :api do
    namespace :v1 do
      resources :ideas, except: [:new, :edit]
    end
  end

  root 'home#index'
end
