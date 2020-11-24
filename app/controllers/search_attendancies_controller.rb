class SearchAttendanciesController < ApplicationController
  def index
    @search_attendancies = current_user.search_attendancies

    @itineraries = @search_attendancies.where.not(itinerary: nil).map(&:itinerary)
    @colors = @search_attendancies.map(&:color)
  end

  def show
    @search_attendancy = SearchAttendancy.find(params[:id])
  end

  def new
    @search_attendancy = SearchAttendancy.create(start_at: Time.now, color: "#DC758F", user: current_user)
  end
end
