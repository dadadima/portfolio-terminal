/**
 * Middleware function to wrap Express middleware functions for use in Next.js API routes
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} fn - The middleware function to run
 * @returns {Promise} - A promise that resolves or rejects based on the middleware function's result
 */
export default function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    // Call the middleware function, and handle the result
    fn(req, res, result => {
      // If the result is an instance of Error, reject the promise
      if (result instanceof Error) {
        return reject(result);
      }

      // If there's no error, resolve the promise
      return resolve(result);
    });
  });
}