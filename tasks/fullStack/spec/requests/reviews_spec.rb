require 'rails_helper'

RSpec.describe "Reviews", type: :request do
  describe "#create" do
    it "can return success" do
      get new_review_path
      expect(response).to be_successful
    end
  end
end
