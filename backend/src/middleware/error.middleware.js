const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: err.success || false,
        message: err.message || "Somethinfg went wrong",
        errors: err.errors || []
    });
}

export default errorHandler;