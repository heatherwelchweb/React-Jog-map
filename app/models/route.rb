# == Schema Information
#
# Table name: routes
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  waypoints  :string           not null
#  distance   :float            not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Route < ApplicationRecord
  validates :title, :waypoints, :distance, presence: true
  validates :title, uniqueness:
    { scope: :user, message: 'You already have a route with than name' }

  belongs_to :user
end
