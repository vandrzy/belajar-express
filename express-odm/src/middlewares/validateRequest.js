import AppError from "../utils/appError.js";

export const validateRequestBodyJoi = (schema) => async (req, res, next) => {
    try {
        req.body = await schema.validateAsync(req.body, {
            abortEarly: false
        });
        next();
    } catch (error) {
        if (error.isJoi){
            return next (new AppError(error.message, 400))
        }
        next(error)
    }
}

export const validateRequestBodyZod = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return next(
      new AppError(
        "Validation error",
        400,
      )
    );
  }

  req.body = result.data;
  next();
};


export const validateRequestQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);

  if (!result.success) {
    return next(
      new AppError(
        result.error.errors.map(e => e.message).join(', '),
        400,
      )
    );
  }

  req.validatedQuery = result.data;
  next();


}





