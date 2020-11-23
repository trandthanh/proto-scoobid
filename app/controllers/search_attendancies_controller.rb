class SearchAttendanciesController < ApplicationController
  def index
    @search_attendancies = current_user.search_attendancies

    @itineraries = @search_attendancies.map(&:itinerary)
    @colors = @search_attendancies.map(&:color)
  end
end
