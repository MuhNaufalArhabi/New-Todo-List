function num(my_num) {
    const num_str = my_num.toString()
    if(num_str[num_str.length - 1] === '0'){
        return 'zero'
    }
}

console.log(num(100))