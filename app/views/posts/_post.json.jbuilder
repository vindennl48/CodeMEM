json.extract! post, :id, :name, :body, :category1, :category2, :category3, :created_at, :updated_at
json.url post_url(post, format: :json)
