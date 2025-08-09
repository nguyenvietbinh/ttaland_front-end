📖 API Documentation
Base URL
http://localhost:8000/api/
Response Format
All endpoints return JSON responses with pagination:

{
  "count": 10,
  "next": "http://localhost:8000/api/properties/?page=2",
  "previous": null,
  "results": [...]
}
🏢 Development Projects
List All Projects
GET /api/projects/

Response:

{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "P-001",
      "name": "Sunset Gardens",
      "location": "Downtown District",
      "developer": "ABC Development Co.",
      "general_contractor": "XYZ Construction",
      "project_type": "mixed",
      "delivery_time": "2025-12-31",
      "completion_standard": "Luxury",
      "management_unit": "Property Management Ltd.",
      "distributor": "Real Estate Agency",
      "area_size": "3.50",
      "area_size_formatted": "3.50 Ha",
      "quantity": "231 căn",
      "policy": "Sổ hồng"
    }
  ]
}
Field Descriptions:

area_size (decimal): Project area in hectares (raw number)
area_size_formatted (string): Formatted area with unit (e.g., "3.5 Ha")
quantity (string): Number of units in the project (e.g., "231 căn")
policy (text): Policy information such as ownership documentation (e.g., "Sổ hồng")
Get Project Details
GET /api/projects/{project_id}/

Parameters:

project_id (string): The unique identifier of the project (e.g., "P-001", "P-002")
🏠 Properties
List All Properties
GET /api/properties/

Query Parameters:

type (string): Filter by property type (apartment, townhouse, villa, land)
for_sale (boolean): true for sale, false for rent
min_price (decimal): Minimum price filter
max_price (decimal): Maximum price filter
project (string): Filter by development project ID
page (integer): Page number for pagination
Example Requests:

# Get all properties
GET /api/properties/

# Get apartments for sale
GET /api/properties/?type=apartment&for_sale=true

# Get properties in price range
GET /api/properties/?min_price=100000&max_price=500000

# Get properties from specific project
GET /api/properties/?project=P-001
Response:

{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "A-001",
      "title": "Modern 2BR Apartment",
      "description": "Beautiful apartment with city view",
      "area": "85.50",
      "location": "Downtown District",
      "price": "250000.00",
      "for_sale": true,
      "type": "apartment",
      "project": {
        "id": "P-001",
        "name": "Sunset Gardens",
        "location": "Downtown District"
      },
      "created_at": "2025-07-21T10:30:00Z",
      "media": [
        {
          "id": "456e7890-e89b-12d3-a456-426614174001",
          "media_type": "image",
          "file": "/media/properties/A-001/image1.jpg",
          "uploaded_at": "2025-07-21T10:30:00Z",
          "order": 0
        }
      ]
    }
  ]
}
Get Property Details
GET /api/properties/{property_id}/

Parameters:

property_id (string): The unique identifier of the property (e.g., "A-001", "T-001")
🏢 Property Type Specific Endpoints
Apartments
GET /api/apartments/ GET /api/apartments/{apartment_id}/

Additional apartment details included:

{
  "apartment_details": {
    "floor_number": 5,
    "bedrooms": 2,
    "bathrooms": 2,
    "balcony": true
  }
}
Townhouses
GET /api/townhouses/ GET /api/townhouses/{townhouse_id}/

Additional townhouse fields in list view:

{
  "id": "T-001",
  "title": "Modern Townhouse",
  "bedrooms": 4,
  "bathrooms": 3,
  "garage": 2,
  // ... other standard fields
}
Additional townhouse details in detail view:

{
  "townhouse_details": {
    "floors": 3,
    "bedrooms": 4,
    "bathrooms": 3,
    "living_room": true,
    "garage": 2,
    "policy": "Đang cập nhật",
    "structure": "Đang cập nhật",
    "interior": "Đang cập nhật"
  }
}
Villas
GET /api/villas/ GET /api/villas/{villa_id}/

Additional villa fields in list view:

{
  "id": "V-001",
  "title": "Luxury Villa",
  "bedrooms": 5,
  "bathrooms": 4,
  "garage": 3,
  // ... other standard fields
}
Additional villa details in detail view:

{
  "villa_details": {
    "floors": 2,
    "bedrooms": 5,
    "bathrooms": 4,
    "living_room": true,
    "garden": true,
    "swimming_pool": true,
    "garage": 3
  }
}
Land Lots
GET /api/land/ GET /api/land/{land_id}/

Additional land details included:

{
  "land_details": {
    "land_type": "residential",
    "road_frontage": "25.50",
    "road_frontage_formatted": "25.5 m"
  }
}
🔍 Search & Utility Endpoints
Search Properties
GET /api/search/

Query Parameters:

q (string): Search query for title and description
Example:

GET /api/search/?q=modern apartment
Get Property Types
GET /api/property-types/

Response:

{
  "property_types": [
    {"value": "land", "label": "Land"},
    {"value": "townhouse", "label": "Townhouse"},
    {"value": "villa", "label": "Villa"},
    {"value": "apartment", "label": "Apartment"}
  ]
}
Get Similar Properties
GET /api/similar/{property_id}/

Parameters:

property_id (string): The unique identifier of the property (e.g., "A-001", "T-001")
Response:

{
  "product_id": "T-001",
  "similar_products": ["T-002", "T-005", "T-010", "T-015", "T-020"],
  "criteria": {
    "type": "townhouse",
    "price_range": "10,990,000,000 - 20,410,000,000 VND",
    "area_range": "80.0 - 120.0 m²",
    "for_sale": true
  }
}
Similarity Criteria:

Same property type (apartment, townhouse, villa, land)
Price range: ±30% of the original property price
Area range: ±20% of the original property area
Same transaction type (for sale or for rent)
Maximum 5 results returned in random order
📊 Common Query Patterns
Filter Examples
# Get all apartments for rent under $2000
GET /api/apartments/?for_sale=false&max_price=2000

# Get all villas for sale with swimming pool
GET /api/villas/?for_sale=true

# Get properties from a specific project
GET /api/properties/?project=P-001

# Search for properties with "garden"
GET /api/search/?q=garden
Pagination
# Get page 2 of results
GET /api/properties/?page=2

# Adjust page size (default: 20)
# Note: Page size is configured server-side
🗂️ Property ID Format
Properties and projects use specific ID formats based on type:

Development Projects: P-001, P-002, etc.
Apartments: A-001, A-002, etc.
Townhouses: T-001, T-002, etc.
Villas: V-001, V-002, etc.
Land: L-001, L-002, etc.
📱 Media Files
Properties can have associated media files (images and videos):

Maximum 10 images per property
Maximum 3 videos per property
Files are accessible via the media array in property responses
File URLs are relative to the base media URL: http://localhost:8000/media/
⚠️ Error Responses
404 Not Found
{
  "detail": "Not found."
}
400 Bad Request
{
  "field_name": [
    "This field is required."
  ]
}
🔧 Development Notes
CORS: Configured for frontend development on ports 3000 and 8080
Authentication: Currently set to AllowAny for development
Database: PostgreSQL with connection to db container
Media Storage: Local filesystem storage in /media/ directory