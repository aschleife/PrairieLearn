var ERR = require('async-stacktrace');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

var logger = require('../../lib/logger');
var filePaths = require('../../lib/file-paths');
var questionServers = require('../../question-servers');
var sqldb = require('../../lib/sqldb');
var sqlLoader = require('../../lib/sql-loader');

var sql = sqlLoader.loadSqlEquiv(__filename);

router.get('/variant/:variant_id/*', function(req, res, next) {
    var variant_id = req.params.variant_id;
    var filename = req.params[0];
    var params = {
        instance_question_id: res.locals.instance_question.id,
        variant_id: variant_id,
    };
    sqldb.queryOneRow(sql.select_variant, params, function(err, result) {
        if (ERR(err, next)) return;
        var variant = result.rows[0];
        questionServers.getModule(res.locals.question.type, function(err, questionModule) {
            if (ERR(err, next)) return;
            questionModule.getFile(filename, variant, res.locals.question, res.locals.course, function(err, fileData) {
                if (ERR(err, next)) return;
                res.attachment(filename);
                res.send(fileData);
            });
        });
    });
});

module.exports = router;
