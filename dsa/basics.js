const nums = [1, 2, 3, 4];
const doubledNums = nums.map((num) => num * 2)
console.log(doubledNums);

const nums1 = [1, 2, 3, 4, 5, 6];
const num1Even = nums1.filter((num) => num % 2 == 0)
console.log(num1Even)

const nums2 = [4, 8, 12, 15, 3];
const nums2Find = nums2.find(num => num > 10)
console.log(nums2Find)

const nums3 = [1, 2, 3, 4];
const nums3Reduce = nums3.reduce((acc, num)=>( acc + num),0)
console.log(nums3Reduce)

const nums4 = [1, 2, 3, 6];
const nums4Some = nums4.some(num => num > 5)
console.log(nums4Some)

const nums5 = [1, 2, 3, 4];
const nums5Every = nums5.every( num => num > 0)
console.log(nums5Every)

const fruits = ["banana", "apple", "mango"];
const fruitsIncludes = fruits.includes("apple")
console.log(fruitsIncludes)

const nums6 = [4, 1, 7, 2];
const nums6Asc = nums6.sort((a,b)=> a - b)
console.log(nums6Asc)

const fruits2 = ["apple", "banana", "mango"];
const fruits2Foreach = fruits2.forEach((fruit, index) => console.log(index, fruit))

const nums7 = [10, 20, 30, 40];
const nums7Slice = nums7.slice(0,2)
console.log(nums7Slice)

const nums8 = [10, 20, 30, 40];
const nums8Splice = nums8.splice(2,1)
// starts fron index 2 and removes 1 element
console.log(nums8Splice)
console.log(nums8)
// [ 30 ]
// [ 10, 20, 40 ]