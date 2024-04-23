"use strict";
function throttleDecorator(func, interval) {
    let lastExecuted = 0;
    let timer;
    return function (...args) {
        const now = Date.now();
        const elapsed = now - lastExecuted;
        if (!timer || elapsed >= interval) {
            func.apply(this, args);
            lastExecuted = now;
        }
        else {
            if (timer)
                clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
                lastExecuted = Date.now();
            }, interval - elapsed);
        }
    };
}
// Sử dụng decorator để tạo hàm throttledLog
const logMessage = (message) => console.log(message);
const throttledLog = throttleDecorator(logMessage, 1000);
// Gọi hàm throttledLog với các tham số khác nhau
throttledLog("Message 1"); // Output: "Message 1"
throttledLog("Message 2"); // Ignored, as the interval hasn't passed yet
// Thiết lập một hàm bất đồng bộ gọi hàm throttledLog sau 1.2 giây
setTimeout(() => throttledLog("Message 3"), 1200); // Output: "Message 3"
