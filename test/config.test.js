'use strict';
var Config = require('../lib/config'),
    GeminiError = require('../lib/errors/gemini-error');

describe('config', function() {
    it('should require root url', function() {
        (function() {
            return new Config('/', [
                'gridUrl: http://example.com'
            ].join('\n'));
        }.must.throw(GeminiError));
    });

    it('should require grid url is there are non-phantomjs browsers', function() {
        (function() {
            return new Config('/', [
                'rootUrl: http://example.com',
                'browsers:',
                '  - phantomjs',
                '  - non-phantomjs'
            ].join('\n'));
        }.must.throw(GeminiError));
    });

    it('should not require grid url if there are only phantomjs browser', function() {
        (function() {
            return new Config('/', [
                'rootUrl: http://example.com',
                'browsers:',
                '  - phantomjs'
            ].join('\n'));
        }.must.not.throw());
    });

    describe('capabilities', function() {
        it('should be copied as is', function() {
            var config = new Config('/', [
                'rootUrl: http://example.com',
                'gridUrl: http://example.com',
                'capabilities:',
                '  option: value',
                '  option2: other value'
            ].join('\n'));

            config.capabilities.must.eql({
                option: 'value',
                option2: 'other value'
            });
        });

        function shouldNotAllowCapability(name) {
            it('should not allow set `' + name + '` capability', function() {
                (function() {
                    return new Config('/', [
                        'rootUrl: http://example.com',
                        'gridUrl: http://example.com',
                        'capabilities:',
                        '  ' + name + ': value'
                    ].join('\n'));
                }.must.throw());
            });
        }

        shouldNotAllowCapability('browserName');
        shouldNotAllowCapability('version');
        shouldNotAllowCapability('takesScreenshot');
    });
});
