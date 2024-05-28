# Filtering Segment API Documentation

|Operator|Behavior|Example
|---|---|-|
|==|Equals|&filters=type==department Return results where the user type is department|
|!=|Not Equals|&filters=fullName!=1 Return results where the full name isn't Nora|
|<=|Less than or equal to|&filters=age<=30 Return results where the age is less than or equal to 30|
|<|Less than|&filters=price<100 Return results where the price is less than 100|
|>=|Greater than or equal to|&filters=quantity>=10 Return results where the quantity is greater than or equal to 10|
|>|Greater than|&filters=rating>4.5 Return results where the rating is greater than 4.5|
|=@|Contains|&filters=name=@apple Return results where the name contains "apple"|
|!=|Does not contain|&filters=description!=@lorem Return results where the description does not contain "lorem"|
|=^|Starts with|&filters=city=^New Return results where the city starts with "New"|
|=$|Ends with|&filters=country=$land Return results where the country ends with "land"|