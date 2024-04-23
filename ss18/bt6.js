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
function validateTypes(...types) {
    return function (target, key, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            if (args.length !== types.length) {
                return `Expected ${types.length} arguments, but received ${args.length}`;
            }
            args.forEach((arg, index) => {
                if (typeof arg !== types[index].name.toLowerCase()) {
                    return `Argument at index ${index} is expected to be of type ${types[index].name}`;
                }
            });
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
class Example5 {
    static exampleFunction(num, str) {
        console.log(`Received number: ${num}, string: ${str}`);
    }
}
__decorate([
    validateTypes(Number, String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], Example5, "exampleFunction", null);
5;
Example5.exampleFunction(10, "Hello"); // Thành công
Example5.exampleFunction("10", "Hello"); // Lỗi: Tham số đầu tiên phải là một số
Example5.exampleFunction(10, 20); // Lỗi: Tham số thứ hai phải là một chuỗi
Example5.exampleFunction(10); // Lỗi: Số lượng tham số không đúng
