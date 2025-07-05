# 📋 Adoption Request Status Service - Shaggy Mission

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</div>

<div align="center">
  <h3>📋 Adoption Request Status Management Microservice</h3>
  <p><em>Part of the Shaggy Mission ecosystem - Manage and update adoption request statuses! 🐕🐱</em></p>
</div>

---

## 🌟 Overview

The **Adoption Request Status Service** is a specialized microservice in the Shaggy Mission platform that handles the management and status updates of pet adoption requests. This service enables rescue organizations, adoption centers, and administrators to efficiently process adoption applications, making critical decisions about pet placements and managing the adoption approval workflow.

## 🎯 What This Service Does

- **Request Status Management**: Update adoption request statuses from pending to approved/rejected
- **Application Processing**: Handle the decision-making process for adoption applications
- **Workflow Control**: Manage the transition from pending applications to final decisions
- **Data Validation**: Ensure status updates follow valid business rules
- **Administrative Tools**: Provide adoption coordinators with request management capabilities
- **Status Tracking**: Maintain complete history of adoption request decisions
- **Integration Support**: Designed to work with user management and pet services

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Data Validation**: Mongoose schema validation with enum constraints
- **Status Management**: PATCH endpoint for status updates by Request ID
- **RESTful Design**: Clean RESTful API design patterns
- **Documentation**: Swagger UI for interactive API documentation
- **Error Handling**: Comprehensive validation and error management

## 📡 API Endpoints

### Adoption Request Status Update
**`PATCH /adoption-requests/:id`**
- Updates the status of a specific adoption request by ID
- Validates request ID and status values
- Supports approval and rejection of adoption applications
- Returns updated request record with new status

**Request Parameters:**
- `id` (path): MongoDB ObjectId of the adoption request to update

**Request Body:**
```json
{
  "status": "approved"
}
```

**Successful Response (200):**
```json
{
  "_id": "64f8b2a1c3d4e5f6a7b8c9d4",
  "userId": "64f8b2a1c3d4e5f6a7b8c9d1",
  "petId": "64f8b2a1c3d4e5f6a7b8c9d0",
  "message": "I would love to adopt this beautiful dog. I have experience with pets and a large backyard.",
  "status": "approved",
  "dateRequested": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid status value
  ```json
  {
    "message": "Invalid status. Allowed: approved, rejected"
  }
  ```
- `404 Not Found`: Adoption request not found
  ```json
  {
    "message": "Adoption request not found"
  }
  ```
- `500 Internal Server Error`: Server or database issues
  ```json
  {
    "message": "Server error"
  }
  ```

### API Documentation
**`GET /adoptionStatus-Request-docs`**
- Interactive Swagger UI documentation
- Complete API specification with examples
- Request/response schemas and validation rules
- Try-it-out functionality for testing the status update endpoint

## 🔧 Core Functionality

### Request Status System
The service manages three distinct request statuses:

- **`pending`**: Initial status when request is submitted (default)
- **`approved`**: Request has been approved by administrators
- **`rejected`**: Request has been rejected by administrators

### Status Workflow
```
pending → approved   (Application approved)
pending → rejected   (Application rejected)
```

### Update Features
- **Status Validation**: Only allows approved/rejected status updates
- **Request Verification**: Validates request existence before update
- **Automatic Persistence**: Saves changes to database automatically
- **Error Handling**: Comprehensive error responses for all scenarios
- **ID Validation**: Validates MongoDB ObjectId format

## 🌐 Service Integration

This microservice integrates seamlessly with other Shaggy Mission platform components:

- **User Management Service**: Links requests to user profiles
- **Pet Management Service**: Associates requests with specific pets
- **Notification System**: Triggers alerts when requests are processed
- **Email Service**: Sends approval/rejection notifications to users
- **Administrative Dashboard**: Provides request management interface
- **Reporting Services**: Tracks adoption request metrics and success rates

## 🔒 Data Security & Validation

- **Request ID Validation**: Validates MongoDB ObjectId format
- **Status Validation**: Restricts status updates to valid values only
- **Input Sanitization**: Validate and sanitize all input data
- **Error Handling**: Comprehensive validation and error management
- **Data Integrity**: Maintains consistent request workflow states
- **Access Control**: Designed for administrative access control

## 🗃️ Database Schema

### AdoptionRequest Document Structure
```javascript
{
  _id: ObjectId,                    // MongoDB unique identifier
  userId: String (required),        // User who submitted the request
  petId: String (required),         // Pet being requested for adoption
  message: String (optional),       // User's adoption message/reason
  status: String (enum: [           // Current request status
    'pending',                      // Awaiting review (default)
    'approved',                     // Request approved
    'rejected'                      // Request rejected
  ], default: 'pending'),
  dateRequested: Date (default: Date.now) // When request was submitted
}
```

### Request Processing Flow
```
1. User submits adoption request → status: "pending"
2. Administrator reviews request
3. Administrator updates status → "approved" or "rejected"
4. User receives notification of decision
5. If approved → adoption process continues
6. If rejected → user can submit new request
```

## 📚 API Documentation

Complete API documentation is available through Swagger UI at `/adoptionStatus-Request-docs` when the service is running. The documentation includes:

- **Interactive endpoint testing** with request status update examples
- **Comprehensive request/response schemas** with validation rules
- **Status workflow explanations** and business logic
- **Error handling scenarios** and status codes
- **Request ID validation** requirements and formats
- **Integration examples** and common use cases

## 🔧 Development

### Project Structure
```
├── config/
│   └── db.js                         # MongoDB connection setup
├── controllers/
│   └── adoptionRequest.controller.js # Request status update logic
├── models/
│   └── adoptionRequest.model.js      # Mongoose AdoptionRequest schema
├── routes/
│   └── adoptionRequest.routes.js     # API route definitions
├── docs/
│   └── swagger.yaml                  # OpenAPI specification
├── app.js                            # Express application setup
└── server.js                         # Server startup and configuration
```

### Testing the API
```bash
# Approve adoption request
curl -X PATCH http://localhost:3017/adoption-requests/64f8b2a1c3d4e5f6a7b8c9d4 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "approved"
  }'

# Reject adoption request
curl -X PATCH http://localhost:3017/adoption-requests/64f8b2a1c3d4e5f6a7b8c9d4 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "rejected"
  }'

# Expected response: 200 OK with updated request object
```

## 🔄 Adoption Request Workflows

### Request Approval Process
1. **Request Submitted**: User submits adoption request (status: "pending")
2. **Administrator Review**: Admin reviews user profile and request details
3. **Background Check**: Verify user's suitability for pet adoption
4. **Decision Making**: Admin approves or rejects based on criteria
5. **Status Update**: Update request status to "approved" or "rejected"
6. **Notification**: User receives notification of decision

### Request Review Criteria
- **User Profile**: Complete and verified user information
- **Pet Compatibility**: Match between user preferences and pet needs
- **Living Situation**: Appropriate environment for the specific pet
- **Experience**: User's experience with pets and specific breeds
- **References**: Contact references and previous adoption history
- **Home Visit**: Successful home visit if required

### Administrative Decision Process
1. **Request Queue**: Review pending requests in order of submission
2. **User Evaluation**: Assess user's adoption application thoroughly
3. **Pet Matching**: Ensure compatibility between user and pet
4. **Decision Documentation**: Record reasoning for approval/rejection
5. **Status Update**: Update request status in system
6. **Follow-up**: Schedule next steps for approved requests

## ⚡ Performance Considerations

### Database Optimization
- **Indexed Queries**: Request ID indexed for efficient lookups
- **Atomic Updates**: Single database operation for status updates
- **Minimal Data Transfer**: Only send necessary fields
- **Connection Pooling**: Efficient MongoDB connection management

### Update Efficiency
- **Single Document Updates**: Efficient MongoDB findById and save
- **Status Validation**: Fast enum validation at application level
- **Error Handling**: Quick validation before database operations
- **Response Optimization**: Return complete updated document

## 🚀 Future Enhancements

- **Bulk Status Updates**: Process multiple requests simultaneously
- **Request Comments**: Add administrator comments to decisions
- **Status History**: Track complete request status change history
- **Automated Notifications**: Email/SMS notifications for status changes
- **Request Analytics**: Detailed metrics on approval/rejection rates
- **Priority Queuing**: Prioritize certain requests based on criteria
- **Integration Webhooks**: Notify external systems of status changes
- **Advanced Filtering**: Filter requests by various criteria

## 📊 Common Use Cases

### Daily Operations
- **Request Processing**: Review and process pending adoption requests
- **Status Updates**: Update request statuses after review
- **User Communication**: Notify users of request decisions
- **Record Keeping**: Maintain complete request processing history

### Administrative Tasks
- **Request Queue Management**: Organize and prioritize pending requests
- **Decision Documentation**: Record reasons for approval/rejection
- **User Follow-up**: Contact users about approved requests
- **Performance Tracking**: Monitor request processing efficiency

### Integration Scenarios
- **Notification Service**: Trigger notifications for status changes
- **User Portal**: Display request status in user dashboard
- **Pet Management**: Update pet availability based on approvals
- **Reporting System**: Generate adoption request analytics

## 🔧 Error Handling

### Validation Errors
- **Invalid Status**: Returns 400 for non-approved/rejected status values
- **Missing Request**: Returns 404 when request ID doesn't exist
- **Invalid Request ID**: Returns 400 for malformed MongoDB ObjectId
- **Missing Data**: Returns 400 for missing required fields

### System Errors
- **Database Connection**: Returns 500 with server error message
- **Update Failure**: Returns 500 when database update fails
- **Server Errors**: Returns 500 with appropriate error messages
- **Timeout Handling**: Graceful handling of database timeouts

## 📋 Business Rules

### Status Update Rules
- **Pending to Approved**: Valid transition for accepted requests
- **Pending to Rejected**: Valid transition for declined requests
- **No Reverse Transitions**: Approved/rejected requests cannot be changed
- **Administrator Only**: Only administrators can update request statuses

### Request Validation
- **User Verification**: Ensure user exists and is verified
- **Pet Availability**: Verify pet is still available for adoption
- **Request Authenticity**: Validate request belongs to specified user
- **Duplicate Prevention**: Prevent duplicate requests for same pet

---

<div align="center">
  <p><strong>Built with ❤️ for street dogs and cats everywhere 🐕🐱</strong></p>
  <p><em>Helping every pet find their perfect forever home through careful request management!</em></p>
  <p>📖 <a href="/adoptionStatus-Request-docs">View API Documentation</a></p>
</div>