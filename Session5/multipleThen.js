
function daily(data) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, data);
    })
    return promise;
}

const promise = daily(1);

function fun1(data) {
    console.log(data);
    return (data + " from fun1");
}
promise
    .then((data) => (fun1(data)))
    .then((data) => (console.log(data)))
    .catch((err) => (console.log(err)))
    .finally(() => (console.log("Done")))
