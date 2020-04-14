from geopy.geocoders import GoogleV3


geolocator = GoogleV3(api_key="AIzaSyAXHJ8U6Jq865DxZqti6wQsLRp7IkE8uSg", user_agent="dashboard")
location = geolocator.geocode("ISGlobal")
print(location.latitude, location.longitude)
