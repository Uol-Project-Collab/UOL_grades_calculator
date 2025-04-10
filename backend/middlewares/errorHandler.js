const errorHandler = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error:`, err.stack);
    
    // Handle Joi validation errors
    if (err.details && err.details[0].type === 'any.required') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: err.details[0].message
      });
    }
  
    // Handle specific error types
    switch (err.name) {
      case 'ValidationError':
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: err.message
        });
        
      case 'UnauthorizedError':
        return res.status(401).json({
          success: false,
          error: 'Authentication Failed',
          message: err.message
        });
  
      default:
        return res.status(err.statusCode || 500).json({
          success: false,
          error: 'Server Error',
          message: process.env.NODE_ENV === 'production' 
            ? 'Something went wrong' 
            : err.message
        });
    }
  };
  
  module.exports = errorHandler;