# Question Rotation System

This project implements a highly scalable question rotation system using NestJS, MongoDB, Redis, and Swagger. It's designed to handle dynamic question assignments for different regions on a weekly cycle, with advanced features for improved performance and scalability.

## Architecture and Design

The system is built with the following components:

1. **Questions**: Stored in MongoDB with region and order information.
2. **Cycles**: Represent weekly periods for question assignments.
3. **Assignments**: Link questions to cycles for specific regions.
4. **Redis Cache**: Implements a caching layer for improved performance.

### Key Features

- **High Scalability**: Designed to handle millions of global users with efficient data management.
- **Region-specific Assignments**: Questions are assigned based on user regions.
- **Configurable Cycle Duration**: Currently set to 7 days, but can be easily adjusted.
- **Automatic Assignment**: Uses a cron job to assign new questions every Monday at 7 PM SGT.
- **RESTful API**: Provides endpoints for retrieving current assignments.
- **Swagger Documentation**: API endpoints are documented using Swagger.
- **Redis Caching**: Implements a caching layer to reduce database load and improve response times.
- **Environment Configuration**: Uses .env file for easy configuration across different environments.

### Advanced Scalability Features

1. **Redis Caching**: 
   - Caches assignments for a week, significantly reducing database queries.
   - Improves response times for frequently accessed data.

2. **Database Indexing**: 
   - Implements proper indexing on MongoDB collections for faster queries.

3. **Asynchronous Processing**: 
   - Uses NestJS's built-in scheduling for background tasks.

4. **Horizontal Scaling Ready**: 
   - Stateless application design allows for easy deployment across multiple servers.

5. **Configurable Environment**: 
   - Uses .env file for easy configuration in different deployment environments.

6. **Optimized Cron Job**: 
   - Weekly assignment process is optimized to handle large-scale operations efficiently.

## Setup and Running

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in the `.env` file (MongoDB URI, Redis configuration, etc.)
4. Ensure Redis is installed and running on your system
5. Run the application: `npm run start:dev`

## API Documentation

Access the Swagger UI at `http://localhost:3000/api` when the application is running.

## Future Improvements

2. Add comprehensive error handling and logging with tools like Winston or Pino.
3. Implement a more sophisticated caching strategy with cache invalidation.
7. Implement rate limiting to prevent API abuse.
8. Use database transactions for critical operations to ensure data consistency.
9. Implement a message queue system (e.g., RabbitMQ) for handling high-volume background tasks.
10. Add monitoring and alerting system using tools like Prometheus and Grafana.

## Pros and Cons

### Pros

1. Highly scalable architecture suitable for millions of users.
2. Redis caching significantly improves performance and reduces database load.
3. Flexible design allowing for easy addition of new regions or changing cycle durations.
4. Automated assignment process reduces manual intervention.
5. Clear separation of concerns with modular design.
6. Well-documented API with Swagger integration.
7. Environment-based configuration for easy deployment across different setups.

### Cons

1. Relies on Redis for caching, introducing another infrastructure component to manage.
2. Weekly cron job might cause a spike in Redis operations at the time of assignment.
3. Current implementation doesn't account for time zones, which might be an issue for global deployment.
4. Requires careful management of cache invalidation to ensure data consistency.

## Conclusion

This question rotation system provides a robust and scalable foundation for handling dynamic question assignments at a global scale. Its advanced features, including Redis caching and optimized database operations, make it well-suited for high-traffic applications. The modular design and use of modern technologies make it easily extensible for future enhancements and scaling to meet growing user demands.