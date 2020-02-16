
function daily(data) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(resolve, 5000, data);
    })
    return promise;
}

const promise = daily(1);
promise
    .then((data) => (console.log(data)))
    .catch((err) => (console.log(err)))
    // .finally(() => (console.log("Done")))
