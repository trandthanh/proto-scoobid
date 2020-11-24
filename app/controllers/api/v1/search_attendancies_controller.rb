class Api::V1::SearchAttendanciesController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User
  before_action :set_search_attendancy

  def show
  end

  def update
    if @search_attendancy.update(search_attendancy_params)
      render :show
    else
      render_error
    end
  end

  private

  def set_search_attendancy
    @search_attendancy = SearchAttendancy.find(params[:id])
  end

  def search_attendancy_params
    params.require(:search_attendancy).permit(:itinerary)
  end

  def render_error
    render json: { errors: @search_attendancy.errors.full_messages },
      status: :unprocessable_entity
  end
end
