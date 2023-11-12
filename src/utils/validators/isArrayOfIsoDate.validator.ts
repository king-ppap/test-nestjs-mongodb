import { registerDecorator } from 'class-validator';
import { DateTime } from 'luxon';

export function IsStringArrayOfIsoDate() {
  // property: string,
  // validationOptions?: ValidationOptions,
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isArrayOfIsoDate',
      target: object.constructor,
      propertyName: propertyName,
      // constraints: [property],
      options: {
        message: '$value must be string of array of ISO date and not empty',
      },
      validator: {
        validate(value: string) {
          // Is string
          if (typeof value !== 'string') {
            return false;
          }

          // Is stirng json
          let tempInput;
          try {
            tempInput = JSON.parse(value);
          } catch (error) {
            return false;
          }

          // Is array
          if (!Array.isArray(tempInput)) {
            return false;
          }
          if (tempInput.length < 1) {
            return false;
          }

          // Is some not ISO date
          if (
            tempInput.some((e) => {
              return !DateTime.fromISO(e).isValid;
            })
          ) {
            return false;
          }

          return true;
        },
      },
    });
  };
}
