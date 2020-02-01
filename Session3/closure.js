function init(config) {
    return {
        print: function (data) {
            console.log(config + " - " + data);

        }
    }
}

var app = init("*");
app.print("Amrit");