var fs = require('fs')
var join = require('path').join

var languages = {}
var path = ''
function init(options) {
    if (options.path)
        path = options.path
    var files = fs.readdirSync(path)
    for (lang in files) {
        var element = files[lang]
        var data = fs.readFileSync(join(path, element))
        var offset = 0
        for (i = 0; i < data.length; i++) {
            if (data[i] == 123) {
                break
            } else {
                offset++
            }
        }
        languages[element.toLowerCase().replace('.json', '')] = JSON.parse(data.toString('utf-8', offset, data.length))
    }
}
exports.initialize = init
exports.localize = function () {
    return function (req, res, next) {
        req.localize = function (key) {
            var lang = req.locale
            var result = undefined
            if (languages[lang]) {
                result = languages[lang][key]
            } else if (languages['default']) {
                result = languages['default'][key]
            }
            if (!result)
                result = key
            return result
        }
        next()
    }
}