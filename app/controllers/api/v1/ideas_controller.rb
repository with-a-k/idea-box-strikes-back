class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def show
    respond_with Idea.find_by(id: params[:id])
  end

  def create
    respond_with :api, :v1, Idea.create(idea_params)
  end

  def update
    respond_with Idea.find_by(id: params[:id]).update!(idea_params)
  end

  def destroy
    respond_with Idea.find_by(id: params[:id]).destroy!
  end

  private

  def idea_params
    params.require(:idea).permit(:quality, :title, :body)
  end
end
