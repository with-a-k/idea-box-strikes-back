class Idea < ActiveRecord::Base
  enum status: [ :swill, :plausible, :genius ]
end
