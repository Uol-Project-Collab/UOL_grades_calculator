/**
 * Global Express error handler.
 * Catches all errors forwarded via next(err) or thrown in async controllers.
 */
module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') console.error('Error stack:', err.stack);

  // Joi validation error
  if (err.isJoi) {
    const details = err.details.map(d => d.message);
    return res.status(400).json({ success: false, error: 'Validation error', details });
  }

  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ success: false, error: message });
};
