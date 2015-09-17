var app = require('app');
var BrowserWindow = require('browser-window')
var ipc = require('ipc')

app.on('ready', function() {
    var MainWindow = new BrowserWindow({
        width:320,
        height:440,
        frame:false
    })

    // var MainWindow = new BrowserWindow({
    //     width:2000,
    //     height:2000
    // })

    MainWindow.loadUrl('file://'+__dirname+'/app/index.html')


    ipc.on('closeWindow', function() {
        console.log('Closing')
        MainWindow.close()
    })

})
