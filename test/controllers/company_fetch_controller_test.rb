require "test_helper"

class CompanyFetchControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get company_fetch_create_url
    assert_response :success
  end
end
