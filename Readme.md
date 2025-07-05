# 🐾 Pet List Service - Shaggy Mission

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</div>

<div align="center">
  <h3>📋 Pet Information Listing Microservice for Street Animal Rescue</h3>
  <p><em>Part of the Shaggy Mission ecosystem - Browse and discover pets waiting for their forever homes! 🐕🐱</em></p>
</div>

---

## 🌟 Overview

The **Pet List Service** is a core microservice in the Shaggy Mission platform that handles the retrieval and display of pet records. This service enables rescue organizations, potential adopters, and volunteers to browse through available pets with efficient pagination, making it easy to discover animals that need homes.

## 🎯 What This Service Does

- **Pet Record Retrieval**: Fetch and display pet profiles from the database
- **Pagination Support**: Handle large datasets with efficient page-based navigation
- **Complete Pet Information**: Provide comprehensive pet details including health status, location, and images
- **Performance Optimized**: Efficient database queries with pagination for better user experience
- **Adoption Browsing**: Allow users to browse available pets waiting for adoption
- **Error Handling**: Comprehensive validation and error management
- **Responsive Data**: Provide structured data for web and mobile applications

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB Atlas with Mongoose ODM
- **Pagination**: Efficient skip/limit pagination with total count
- **RESTful Design**: Clean GET endpoint for resource retrieval
- **Documentation**: Swagger UI for interactive API documentation
- **Error Handling**: Comprehensive error management and logging

## 📡 API Endpoints

### Pet Listing Endpoint
**`GET /pets/list`**
- Retrieves paginated list of pet records
- Supports page-based navigation with configurable limits
- Returns complete pet information with metadata
- Handles pagination efficiently for large datasets

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- Fixed limit of 10 pets per page for optimal performance

**Request Example:**
```bash
GET /pets/list?page=1
GET /pets/list?page=2
GET /pets/list
```

**Successful Response Example:**
```json
{
  "pets": [
    {
      "_id": "64f8b2a1c3d4e5f6a7b8c9d0",
      "name": "Buddy",
      "breed": "Golden Retriever",
      "age": 3,
      "healthStatus": "Good",
      "description": "A friendly and energetic dog",
      "location": "New York, NY",
      "images": ["https://example.com/buddy.jpg"],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-20T14:45:00.000Z"
    }
  ],
  "currentPage": 1,
  "totalPages": 5
}
```

**Error Responses:**
- `500 Internal Server Error`: Database connection or server issues
  ```json
  {
    "message": "Error listing pets",
    "error": "Database connection failed"
  }
  ```

### API Documentation
**`GET /listPets-docs`**
- Interactive Swagger UI documentation
- Complete API specification with examples
- Request/response schemas and pagination details
- Try-it-out functionality for testing the listing endpoint

## 🔧 Core Functionality

### Pagination System
The service implements efficient pagination by accepting optional page query parameter (defaults to page 1), using MongoDB's skip/limit for optimized queries, calculating total pages based on document count, and returning pagination metadata with results.

### Pet Data Retrieval
The service provides comprehensive pet information including all pet attributes (name, breed, age, health status, description, location, images), creation and update timestamps, efficient database queries with proper indexing support, and complete pet profiles for informed adoption decisions.

### Performance Optimization
Utilizes MongoDB's efficient skip/limit pagination, maintains fixed page size (10 pets) for consistent performance, provides total count for UI pagination controls, and implements error handling for database connectivity issues.

## 🌐 Service Integration

This microservice integrates seamlessly with other Shaggy Mission platform components, working alongside the Pet Registration Service for complete pet management, supporting frontend applications with paginated pet browsing, enabling search and filter functionality (future enhancement), and providing data for adoption recommendation systems.

## 🔒 Data Security & Performance

- **Efficient Queries**: Optimized MongoDB queries with skip/limit
- **Pagination Control**: Fixed page size prevents database overload
- **Error Handling**: Comprehensive error management and logging
- **Data Validation**: Mongoose schema validation for data integrity
- **Performance Monitoring**: Query optimization for large datasets
- **Scalability Ready**: Structure prepared for advanced filtering

## 🗃️ Database Schema

### Pet Document Structure
```javascript
{
  _id: ObjectId,
  name: String (required),
  breed: String (optional),
  age: Number (min: 0, optional),
  healthStatus: String (enum: ['Good', 'Fair', 'Delicate'], default: 'Good'),
  description: String (optional),
  location: String (optional),
  images: [String] (array of URLs),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

### Pagination Response Structure
```javascript
{
  pets: [Pet], // Array of pet documents
  currentPage: Number, // Current page number
  totalPages: Number // Total number of pages available
}
```

## 📚 API Documentation

Complete API documentation is available through Swagger UI at `/listPets-docs` when the service is running. The documentation includes:

- Interactive endpoint testing with pagination examples
- Comprehensive request/response schemas
- Pagination parameter documentation
- Error handling scenarios and status codes
- Pet data structure specifications
- Performance considerations and best practices

## 🔧 Development

### Project Structure
```
├── config/
│   └── db.js                    # MongoDB connection setup
├── controllers/
│   └── pet.controller.js        # Pet listing logic
├── models/
│   └── Pet.js                   # Mongoose Pet schema
├── repositories/
│   └── pet.repository.js        # Database access layer
├── routes/
│   └── pet.routes.js            # API route definitions
├── docs/
│   └── swagger.yaml             # OpenAPI specification
└── app.js                       # Express application setup
```

### Testing the API
```bash
# Get first page of pets
curl "http://localhost:3009/pets/list"

# Get specific page
curl "http://localhost:3009/pets/list?page=2"

# Expected response includes pets array and pagination info
```

### Common Usage Scenarios
- **Adoption Browsing**: Display available pets to potential adopters
- **Volunteer Management**: Show pets that need care or attention
- **Administrative Overview**: Browse all pets in the system
- **Mobile App Support**: Provide paginated data for mobile applications
- **Search Integration**: Base endpoint for filtered search results

## 🔄 Listing Workflows

### Adoption Discovery Process
Potential adopters can browse through available pets with easy navigation, view complete pet profiles with images and descriptions, and navigate through pages to find their perfect companion.

### Administrative Management
Staff can review all pets in the system, monitor pet status and health information, track new arrivals and adoptions, and manage pet data for organizational purposes.

### Integration Support
The service provides data for frontend applications, supports mobile app development with structured responses, enables integration with search and filter systems, and facilitates data export and reporting tools.

## ⚡ Performance Considerations

### Efficient Pagination
- **Fixed Page Size**: 10 pets per page for optimal load times
- **Skip/Limit Optimization**: MongoDB-optimized pagination queries
- **Total Count Calculation**: Efficient document counting for navigation
- **Memory Management**: Controlled data loading prevents memory issues

### Database Optimization
- **Index Support**: Ready for database indexing on common query fields
- **Query Efficiency**: Optimized MongoDB queries for fast response
- **Connection Pooling**: Efficient database connection management
- **Error Recovery**: Robust error handling for database connectivity

## 🚀 Future Enhancements

- **Search Functionality**: Add search by name, breed, location, and other criteria
- **Advanced Filtering**: Filter by age, health status, breed, and availability
- **Sorting Options**: Sort by date added, age, name, or other attributes
- **Image Optimization**: Thumbnail generation and lazy loading support
- **Caching Layer**: Redis caching for frequently accessed pages
- **Real-time Updates**: WebSocket support for live pet availability updates
- **Analytics Integration**: Track popular pets and browsing patterns
- **Geo-location Support**: Location-based pet discovery

---

<div align="center">
  <p><strong>Built with ❤️ for street dogs and cats everywhere 🐕🐱</strong></p>
  <p><em>Helping every pet find their perfect forever home!</em></p>
  <p>📖 <a href="/listPets-docs">View API Documentation</a></p>
</div>