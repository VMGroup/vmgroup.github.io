(function (window) {
  var FileItem = function (filename, user, user_id, date, size, prev_downloads, opt_serverfile) {
    this.filename = filename;
    this.user = user;
    this.user_id = user_id;
    this.date = date;
    this.size = size;
    // Omitted prev_downloads
    this.server_file = opt_serverfile || filename;
  };
  var share_archive_dir = 'share_archive/';
  var get_size_str = function (bytes) {
    if (bytes >= 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    } else if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return bytes.toString() + ' Byte' + (bytes === 1 ? '' : 's');
    }
  };
  var process_list = function (d) {
    var ret = [];
    for (var i = 1; i < d.length; ++i) {
      ret.push({
        file_name: d[i].file_name,
        server_file: d[i].server_file || d[i].file_name,
        user_id: d[i].user_id,
        user_name: d[0][d[i].user_id],
        date: (new Date(d[i].date)).toISOString(),
        size: get_size_str(d[i].size)
      });
    }
    return ret;
  };
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'js/file_archive_list.json', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var orig_data = JSON.parse(xhr.responseText);
      console.log(orig_data);
      var file_list = process_list(orig_data);
      console.log(file_list);
      var container = $('#list-container');
      for (var i = 0; i < file_list.length; ++i) {
        var item = $('<ul class="list-group container-fluid">');
        var link = $('<a class="file-list-filename list-group-item col-md-5 col-xs-12">')
          .attr('href', share_archive_dir + (file_list[i].server_file || file_list[i].file_name))
          .text(file_list[i].file_name);
        item.append(link);
        item.append($('<div class="file-list-info list-group-item col-md-3 col-xs-5">')
          .text(file_list[i].user_name + ' (' + file_list[i].user_id + ')'));
        item.append($('<div class="file-list-info list-group-item col-md-2 col-xs-4">').text(file_list[i].date));
        item.append($('<div class="file-list-info list-group-item col-md-2 col-xs-3">').text(file_list[i].size));
        container.prepend(item);
      }
    }
  };
  xhr.send();
}(window));
