const getUniqueValues = (arr, atr)=>{

    const NewArr = arr.map(obj=>obj[atr])
    const set = new Set(NewArr)
   
    return (Array.from(set)).sort((a, b)=> +a? a-b : a.localeCompare(b))
}