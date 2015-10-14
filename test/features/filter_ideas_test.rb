require 'test_helper'

class FilterIdeasTest < ActionDispatch::IntegrationTest
  def setup
    Capybara.app = IdeaBoxStrikesBack::Application
    Capybara.current_driver = :selenium
  end

  # test "filters ideas" do
  #   visit root_path
  #   fill_in "idea_search", with: "generates yaml"
  #   assert page.has_content?("Fixture Faker")
  #   refute page.has_content?("Jerry")
  #   refute page.has_content?("Ugh.")
  # end
end