async function to(promise){
    return promise
    .then((response) => [null,response])
    .catch((error) => [error])
}

module.exports = to