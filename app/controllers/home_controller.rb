class HomeController < ApplicationController
  def index
    @new_idea = Idea.new
  end
end
