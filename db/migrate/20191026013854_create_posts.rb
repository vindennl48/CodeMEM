class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :name
      t.text :body
      t.string :category1
      t.string :category2
      t.string :category3

      t.timestamps
    end
  end
end
