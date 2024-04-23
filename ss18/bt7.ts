interface Middleware {
    (params: any[]): any[];
}

function applyMiddleware(...middlewares: Middleware[]) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let modifiedArgs = args;
            middlewares.forEach(middleware => {
                modifiedArgs = middleware(modifiedArgs);
            });

            const result = originalMethod.apply(this, modifiedArgs);


            return result;
        };

        return descriptor;
    };
}

class Example6 {
    @applyMiddleware()
    static exampleFunction(a: number, b: number): number {
        console.log(`Received parameters: ${a}, ${b}`);
        return a + b;
    }
}

console.log(Example6.exampleFunction(2, 3));
