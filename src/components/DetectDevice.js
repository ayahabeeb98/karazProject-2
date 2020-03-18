export function DetectDevice() {
    const module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [
            {name: 'Windows Phone', value: 'Windows Phone', version: 'OS'},
            {name: 'Windows', value: 'Win', version: 'NT'},
            {name: 'iPhone', value: 'iPhone', version: 'OS'},
            {name: 'iPad', value: 'iPad', version: 'OS'},
            {name: 'Kindle', value: 'Silk', version: 'Silk'},
            {name: 'Android', value: 'Android', version: 'Android'},
            {name: 'PlayBook', value: 'PlayBook', version: 'OS'},
            {name: 'BlackBerry', value: 'BlackBerry', version: '/'},
            {name: 'Macintosh', value: 'Mac', version: 'OS X'},
            {name: 'Linux', value: 'Linux', version: 'rv'},
            {name: 'Palm', value: 'Palm', version: 'PalmOS'}
        ],
        databrowser: [
            {name: 'Opera', value: 'Opera', version: 'Opera'},
            {name: 'Chrome', value: 'Chrome', version: 'Chrome'},
            {name: 'Firefox', value: 'Firefox', version: 'Firefox'},
            {name: 'Safari', value: 'Safari', version: 'Version'},
            {name: 'Internet Explorer', value: 'MSIE', version: 'MSIE'},
            {name: 'BlackBerry', value: 'CLDC', version: 'CLDC'},
            {name: 'Mozilla', value: 'Mozilla', version: 'Mozilla'}
        ],
        init: function () {
            let agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);
            return {os: os, browser: browser};
        },
        matchItem: function (string, data) {
            let i = 0,
                regex,
                match;

            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    return {
                        name: data[i].name,
                    };
                }
            }
            return {name: 'unknown', version: 0};
        }
    };

    let e = module.init(),
        debug = {};

    debug.osName = e.os.name;
    debug.browserName = e.browser.name;
    return debug;
}