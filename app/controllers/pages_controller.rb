class PagesController < ApplicationController
  def home
    @my_search_attendancies = current_user.search_attendancies
  end
end
