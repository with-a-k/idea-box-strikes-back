require 'test_helper'

class DeleteAnIdeaTest < ActionDispatch::IntegrationTest
  def setup
    Capybara.app = IdeaBoxStrikesBack::Application
    Capybara.current_driver = :selenium
    @target_idea = Idea.find_by(title: "Jerry").id
  end

  test "deletes an idea" do
    visit root_path
    within(:css, "#idea-#{@target_idea}") do
      click_on "Delete This Idea"
    end
    refute page.has_content?("Jerry")
    refute page.has_content?("Ugh.")
  end
end