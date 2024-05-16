# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Shop, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:products) }
    it { is_expected.to have_many(:reviews).through(:products) }
  end

  # describe 'validations' do
  #   it { is_expected.to validate_presence_of(:attribute) }
  # end
end
