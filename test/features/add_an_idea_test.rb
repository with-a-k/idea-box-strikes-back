require 'test_helper'

class AddAnIdeaTest < ActionDispatch::IntegrationTest
  def setup
    Capybara.app = IdeaBoxStrikesBack::Application
    Capybara.current_driver = :selenium
  end

  test "adds an idea" do
    visit root_path
    fill_in "idea_title", with: "Bejeweled for Game Time"
    fill_in "idea_body", with: "Considering what else in the suggestions is about squares..."
    click_on "Pitch This Idea!"
    fill_in "idea_title", with: ""
    fill_in "idea_body", with: ""
    assert page.has_content?("Bejeweled for Game Time")
    assert page.has_content?("Considering what else")
  end
end