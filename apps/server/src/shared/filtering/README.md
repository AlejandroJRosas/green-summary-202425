# Filtering Segment `API` Documentation

## Operators

|Operator|Behavior|Example
|---|---|-|
|==|Equals|`&filters=type==department` Return results where the user type is department|
|!=|Not Equals|`&filters=fullName!=1` Return results where the full name isn't Nora|
|<=|Less than or equal to|`&filters=age<=30` Return results where the age is less than or equal to 30|
|<|Less than|`&filters=price<100` Return results where the price is less than 100|
|>=|Greater than or equal to|`&filters=quantity>=10` Return results where the quantity is greater than or equal to 10|
|>|Greater than|`&filters=rating>4.5` Return results where the rating is greater than 4.5|
|=@|Contains|`&filters=name=@apple` Return results where the name contains "apple"|
|!=|Does not contain|`&filters=description!=@lorem` Return results where the description does not contain "lorem"|
|=^|Starts with|`&filters=city=^New` Return results where the city starts with "New"|
|=$|Ends with|`&filters=country=$land` Return results where the country ends with "land"|

## `AND` and `OR` delimiters

> [!CAUTION]
> Applying these operations over the same field (multiple values) is currently not supported.

#### AND operator is the ; (semi-colon) character, for example:

- `&filters=propertyType==house;bedrooms>=3` Filter properties that are houses AND have at least 3 bedrooms.
- `&filters=price<=100000;location!=city` Filter properties that are priced less than or equal to $100,000 AND are not located in the city.

#### OR operator is the , (comma) character, for example:

- `&filters=type==department,type==coordinator` Filter properties that are either departments or coordinators. (currently not supported).


Note that if you combine OR and AND operators, the AND operator will take precedence. For example, the following query `&filters=type==department,fullName==Alejandro;type==coordinator` will select "Users with type department OR (Name is Alejandro AND type is coordinatorr)"

