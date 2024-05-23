# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Product, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:shop) }
    it { is_expected.to have_many(:reviews) }
  end

  # describe 'validations' do
  #   it { is_expected.to validate_presence_of(:attribute) }
  # end
end
