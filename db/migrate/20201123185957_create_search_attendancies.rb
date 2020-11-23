class CreateSearchAttendancies < ActiveRecord::Migration[6.0]
  def change
    create_table :search_attendancies do |t|
      t.json :itinerary
      t.datetime :start_at
      t.datetime :ends_at
      t.string :color
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
