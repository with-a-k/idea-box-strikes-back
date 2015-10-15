class IdeasController < ApplicationController
  def edit
    @idea = Idea.find_by(id: params[:id])
  end
end
