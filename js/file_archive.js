(function (window) {
  var FileItem = function (filename, user, user_id, date, size, prev_downloads) {
    this.filename = filename;
    this.user = user;
    this.user_id = user_id;
    this.date = date;
    this.size = size;
    // Omitted prev_downloads
  };
  var file_list = [
    new FileItem('luangao.mp3', 'Pisces', '1786762946', '2015-09-09 09:09', '1.0 MB', 1),
    new FileItem('luangao.mp3', 'Pisces', '1786762946', '2015-09-09 09:09', '1.0 MB', 1),
    new FileItem('luangao.mp3', 'Pisces', '1786762946', '2015-09-09 09:09', '1.0 MB', 1)
  ];
  var container = $('#list-container');
  for (var i = 0; i < file_list.length; ++i) {
    var item = $('<ul class="list-group container-fluid">');
    var link = $('<a class="file-list-filename list-group-item col-md-5 col-xs-12">')
      .attr('href', 'share_archive/' + file_list[i].filename)
      .text(file_list[i].filename);
    item.append(link);
    item.append($('<div class="file-list-info list-group-item col-md-3 col-xs-5">')
      .text(file_list[i].user + ' (' + file_list[i].user_id + ')'));
    item.append($('<div class="file-list-info list-group-item col-md-2 col-xs-4">').text(file_list[i].date));
    item.append($('<div class="file-list-info list-group-item col-md-2 col-xs-3">').text(file_list[i].size));
    container.prepend(item);
  }
}(window));
