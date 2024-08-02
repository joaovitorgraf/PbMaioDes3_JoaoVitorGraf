import createHttpError from 'http-errors';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { loginSchema } from '@validators/index';

const Validators = {
    loginSchema,
};

type ValidatorKey = keyof typeof Validators;

export default function (validator: ValidatorKey) {
    if (!Validators.hasOwnProperty(validator)) {
        throw new Error(`'${validator}' validator does not exist`);
    }

    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const validated = await Validators[validator].validateAsync(req.body, {
                abortEarly: false,
            });
            req.body = validated;
            next();
        } catch (err) {
            if (err instanceof Joi.ValidationError) {
                return next(
                    createHttpError(422, {
                        message: err.details.map(detail => detail.message).join(', '),
                    }),
                );
            }
            next(err);
        }
    };
}
