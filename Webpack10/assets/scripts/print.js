console.log(`print.js has been loaded`)
function print(){
    const content = `hello print again~~~~load?`
    console.log(content)
    console.log(content)();
}

export default print;