Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"

  get "/health" => "rails/health#show", as: :rails_health_check
  get "/ready", to: ->(env) { [ 200, { "Content-Type" => "text/plain" }, [ "OK" ] ] }

  post "/webhooks", to: "webhooks#execute"
end
