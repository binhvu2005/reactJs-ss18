"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function cached(target, key, descriptor) {
    const originalMethod = descriptor.value;
    const cache = {};
    descriptor.value = function (...args) {
        const argsString = JSON.stringify(args);
        if (!(argsString in cache)) {
            console.log("Calculating result...");
            cache[argsString] = originalMethod.apply(this, args);
        }
        else {
            console.log("Result fetched from cache.");
        }
        return cache[argsString];
    };
    return descriptor;
}
class Example1 {
    static add(x, y) {
        return x + y;
    }
}
__decorate([
    cached,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Example1, "add", null);
console.log(Example1.add(4, 6));
console.log(Example1.add(6, 4));
