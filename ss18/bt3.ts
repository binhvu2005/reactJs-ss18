function cached(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cache: { [key: string]: any } = {};

    descriptor.value = function (...args: any[]) {
        const argsString = JSON.stringify(args);
        if (!(argsString in cache)) {
            console.log("Calculating result...");
            cache[argsString] = originalMethod.apply(this, args);
        } else {
            console.log("Result fetched from cache.");
        }
        return cache[argsString];
    };

    return descriptor;
}

class Example1 {
    @cached
    static add(x: number, y: number): number {
        return x + y;
    }
}

console.log(Example1.add(4, 6));
console.log(Example1.add(6, 4));
