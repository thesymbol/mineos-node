var fs = require('fs');
var touch = require("touch");
var path = require('path');
var mineos = exports;
var BASE_DIR = '/var/games/minecraft';
var DIRS = {
  'servers': 'servers',
  'backup': 'backup',
  'archive': 'archive',
  'profiles': 'profiles',
  'import': 'import'
}

mineos.server_list = function(base_dir) {
  return fs.readdirSync(path.join(base_dir, 'servers'));
}

mineos.is_server = function(server_name) {
  return fs.existsSync(path.join(BASE_DIR, 'servers', server_name, 'server.properties'));
}

mineos.create_server = function(server_name) {
  var server_path = path.join(BASE_DIR, 'servers', server_name);

  fs.mkdirSync(server_path);
  touch.sync(path.join(server_path, 'server.properties'));
  touch.sync(path.join(server_path, 'server.config'));
}

mineos.env = function(server_name, base_dir) {
  return {
    server_name: server_name,
    base_dir: base_dir,
    cwd: path.join(base_dir, DIRS['servers'], server_name),
    bwd: path.join(base_dir, DIRS['backup'], server_name),
    awd: path.join(base_dir, DIRS['archive'], server_name),
    sp: path.join(base_dir, DIRS['servers'], server_name, 'server.properties'),
    sc: path.join(base_dir, DIRS['servers'], server_name, 'server.config'),
  }
}