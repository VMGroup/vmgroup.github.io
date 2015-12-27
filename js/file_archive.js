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
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'js/file_archive_list.json', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var orig_data = JSON.parse(xhr.responseText);
      console.log(orig_data);
      var file_list = [];
      var container = $('#list-container');
      for (var i = 0; i < file_list.length; ++i) {
        var item = $('<ul class="list-group container-fluid">');
        var link = $('<a class="file-list-filename list-group-item col-md-5 col-xs-12">')
          .attr('href', 'share_archive/' + file_list[i].server_file)
          .text(file_list[i].filename);
        item.append(link);
        item.append($('<div class="file-list-info list-group-item col-md-3 col-xs-5">')
          .text(file_list[i].user + ' (' + file_list[i].user_id + ')'));
        item.append($('<div class="file-list-info list-group-item col-md-2 col-xs-4">').text(file_list[i].date));
        item.append($('<div class="file-list-info list-group-item col-md-2 col-xs-3">').text(file_list[i].size));
        container.prepend(item);
      }
    }
  };
}(window));
