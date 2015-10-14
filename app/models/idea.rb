class Idea < ActiveRecord::Base
  enum status: [ :swill, :plausible, :genius ]

  validates :title, presence: true
  validates :body, presence: true
end
