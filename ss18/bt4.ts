function validate(validationFunc: Function) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            if (validationFunc(...args)) {
                return originalMethod.apply(this, args);
            } else {
                return "Parameter validation failed.";
            }
        };

        return descriptor;
    };
}

function positiveSumValidation(...args: number[]): boolean {
    const sum = args.reduce((total, num) => total + num, 0);
    return sum > 0;
}

class Example2 {
    @validate(positiveSumValidation)
    static add(x: any, y: any): number {
        return x + y;
    }
}
    console.log(Example2.add(2, 3)); 
    console.log(Example2.add("a", 3)); 
