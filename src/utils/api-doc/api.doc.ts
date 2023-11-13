// https://github.com/nestjs/swagger/issues/417
import { ApiBody } from '@nestjs/swagger';

export const ApiFile =
    (fileName = 'file'): MethodDecorator =>
    (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    [fileName]: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        })(target, propertyKey, descriptor);
    };

export const ApiMultiFile =
    (fileName: 'files'): MethodDecorator =>
    (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        ApiBody({
            type: 'multipart/form-data',
            required: true,
            schema: {
                type: 'object',
                properties: {
                    [fileName]: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                    },
                },
            },
        })(target, propertyKey, descriptor);
    };
