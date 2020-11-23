require 'test_helper'

class SearchAttendanciesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get search_attendancies_index_url
    assert_response :success
  end

end
