// log.decorator.ts
export function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    // Get the class name
    const className = target.constructor.name;

    // Get the current function name
    const currentFunction = propertyKey;

    // Capture the call stack
    const stack = new Error().stack?.split('\n');

    // Get the caller function (second in the stack trace after the current function)
    const callerFunction = stack && stack.length > 2 ? stack[2].trim() : 'Unknown caller';

    console.log(`Class: ${className}, Function: ${currentFunction} called with arguments:`, args);
    console.log(`Called by: ${callerFunction}`);

    const result = originalMethod.apply(this, args);
    console.log(`Result from ${className}.${currentFunction}:`, result);

    return result;
  };

  return descriptor;
}
