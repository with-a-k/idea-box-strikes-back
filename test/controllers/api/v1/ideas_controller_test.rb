require 'test_helper'

class Api::V1::IdeasControllerTest < ActionController::TestCase
  def setup
    DatabaseCleaner.clean!
    @ideas = idea_hash.map do |idea|
      Idea.create(title: idea[:title], body: idea[:body], quality: idea[:quality])
    end
  end

  test "#index" do
    get :index, format: :json
    assert_response :success
    retrieved_ideas = JSON.parse(response.body, symbolize_names: true)
    assert_equal 7, retrieved_ideas.count
  end

  test "#show" do
    get :show, format: :json, id: @ideas[3].id
    assert_response :success
    retrieved_idea = JSON.parse(response.body, symbolize_names: true)
    assert_equal "Fixture Faker", retrieved_idea[:title]
    assert_equal "Automatically generates yaml fixture files for Rails apps.", retrieved_idea[:body]
    assert_equal 2, retrieved_idea[:quality]
  end

  test "#create" do
    post :create, format: :json, idea:{title: 'Skip Nacho Bar', body: 'Who likes those, really?', quality: 0}
    assert_response 201
    created_idea = JSON.parse(response.body, symbolize_names: true)
    assert_equal 'Skip Nacho Bar', created_idea[:title]
    assert_equal 8, Idea.count
  end

  test "#update" do
    patch :update, format: :json, id: @ideas[4].id, idea:{title: 'Lemon Bread', body: 'Welcome to my special hell.'}
    assert_response :success

    updated_idea = Idea.find_by(id: @ideas[4].id)
    assert_equal 'Welcome to my special hell.', updated_idea.body
  end

  test "#destroy" do
    delete :destroy, format: :json, id: @ideas[4].id
    assert_response :success

    assert_equal 6, Idea.count
    refute Idea.pluck(:title).include?('Jerry')
  end

  private

  def idea_hash
    [
      {title: 'Blancarte FFF', body: 'A choice-and-consequences-driven RPG.', quality: 1},
      {title: 'Slightly Dragon Killer', body: 'Sometimes you just have to free humanity from tyrannical dragon gods before you turn into one. Action game.', quality: 0},
      {title: 'Linarite', body: 'What does this gem name even suggest???', quality: 1},
      {title: 'Fixture Faker', body: 'Automatically generates yaml fixture files for Rails apps.', quality: 2},
      {title: 'Jerry', body: 'Ugh.', quality: 0},
      {title: 'Blocketry', body: 'iOS implementation of action-puzzle DS game Meteos.', quality: 1},
      {title: 'Bullet Survive', body: 'A danmaku survival challenge featuring variations on several well-known patterns.', quality: 1},
    ]
  end
end
