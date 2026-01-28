const reverseString = (str) => str.split("").reverse().join("")
// console.log(reverseString("Irshad"))

const polindorome = (str) => {
  const string = str.split("").reverse().join("");
  if (str == string) {
    console.log(`${str} is a polindrome`)
  } else {
    console.log(`${str} is not a polindrome`)
  }
}
// console.log(polindorome("abba"))

// {to reverse integer}
// 1.covert to string 2.covert to array 3.reverse array 4.covert backto string
const reverseInt = (num) => {
  const reversed = num.toString().split("").reverse().join("");
  return parseInt(reversed);
}

// console.log(reverseInt(1289))

// {words first lett to be capital} 
const firstCapital = (str) => {
  return str.toLowerCase().split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")
}
// console.log(firstCapital("irshad sha"))

// {prints 1 to n, if number div 3 print buzz, if div 5 print fizz, if div both print fizzbuzz} 
const fizzbuzz = (n) => {
  for (let i = 0; i <= n; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
      console.log("fizzbuzz")
    } else if (i % 5 == 0) {
      console.log("Fizz")
    } else if (i % 3 == 0) {
      console.log("buzz")
    } else {
      console.log(i)
    }
  }
}
// fizzbuzz(15)

const maxProfit = (prices) => {
  let minPrice = prices[0]
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i];

    minPrice = Math.min(minPrice, currentPrice);

    const currentProfit = currentPrice - minPrice;
    maxProfit = Math.max(maxProfit, currentProfit);
    // console.log(`minPrice: ${minPrice}, currentPrice: ${currentPrice}, currentProfit: ${currentProfit}, maxProfit: ${maxProfit}`)
  }
}

const stock = [7, 1, 5, 3, 6, 4]
const profit = maxProfit(stock)

// [ [ 3, 5, 4 ], [ 2, 6, 7 ], [ 2, 7, 9 ], [ 2 ] ]
const chunk = (arr, size) => {
  const chunked = [];
  let index = 0;

  while (index < arr.length) {
    const chunk = arr.slice(index, index + size);
    chunked.push(chunk)

    index = index + size;
  }

  return chunked
}

console.log(chunk([3, 5, 4, 2, 6, 7, 2, 7, 9, 2], 3))

const twoSum = (arr, target) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        console.log(`${arr[i]} from index ${i} and ${arr[j]} from index ${j} and its sum successfully meets the ${target}`)
      }
    }
  }
}
twoSum([4, 6, 3, 8, 9, 2, 0, 5], 4)



