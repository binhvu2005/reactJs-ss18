function logFunctionInfo(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Function: ${propertyKey}`);
        console.log(`Arguments: ${args}`);

        let result = originalMethod.apply(this, args);
        console.log(`Result: ${result}`);
        return result;
    };

    return descriptor;
}

class Example {
    greet(arg0: string) {
        throw new Error("Method not implemented.");
    }
    @logFunctionInfo
    add(a: number, b: number): number {
        return a + b;
    }
}

let example = new Example();
example.add(2, 3); 
