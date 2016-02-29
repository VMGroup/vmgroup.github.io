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
  var pagi_items_per_page = 2;
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
      // TODO: 按时间降序排序
      // 现在只是简单地 reverse 了一下 -, -
      ret[d.length - i - 1] = {
        file_name: d[i].file_name,
        server_file: d[i].server_file || d[i].file_name,
        user_id: d[i].user_id,
        user_name: d[0][d[i].user_id],
        date: (new Date(d[i].date)).toISOString(),
        size: get_size_str(d[i].size)
      };
    }
    return ret;
  };
  // JSON 加载之后会被覆盖。。这里只是声明一下 - -
  // Selamat pagi!
  var pagi_page_count = 0;
  var pagi_page = 0;
  var file_list = null;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'js/file_archive_list.json', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var orig_data = JSON.parse(xhr.responseText);
      file_list = process_list(orig_data);
      // 初始化 pagination
      pagi_page_count = Math.ceil(file_list.length / pagi_items_per_page);
      pagi_page = 0;
      for (var i = 0; i < pagi_page_count; ++i) {
        var pagi_btn = $("<li id='pagi-" + i + "'><a href='javascript:pagi_go(" + i + ");'>" + (i + 1) + "</a></li>");
        $('#pagi-next').before(pagi_btn);
      }
      $('#pagi-prev').removeClass('disabled');
      $('#pagi-next').removeClass('disabled');
      refresh_disp();
    }
  };
  // 创建列表
  var refresh_disp = function (last_page) {
    if (last_page !== undefined) $('#pagi-' + last_page).removeClass('disabled');
    $('#pagi-' + pagi_page).addClass('disabled');
    var container = $('#list-container');
    container.empty();
    for (var i = pagi_items_per_page * pagi_page; i < Math.min(file_list.length, pagi_items_per_page * (pagi_page + 1)); ++i) {
      var item = $('<ul class="list-group container-fluid">');
      var link = $('<a class="file-list-filename list-group-item col-md-5 col-xs-12">')
        .attr('href', share_archive_dir + (file_list[i].server_file || file_list[i].file_name))
        .text(file_list[i].file_name);
      item.append(link);
      item.append($('<div class="file-list-info list-group-item col-md-3 col-xs-5">')
        .text(file_list[i].user_name + ' (' + file_list[i].user_id + ')'));
      item.append($('<div class="file-list-info list-group-item col-md-2 col-xs-4">').text(file_list[i].date));
      item.append($('<div class="file-list-info list-group-item col-md-2 col-xs-3">').text(file_list[i].size));
      container.append(item);
    }
  };
  // 又一个 pagination
  window.pagi_prev = function () {
    if (pagi_page > 0) {
      --pagi_page;
      refresh_disp(pagi_page + 1);
    }
  };
  window.pagi_next = function () {
    if (pagi_page < pagi_page_count - 1) {
      ++pagi_page;
      refresh_disp(pagi_page - 1);
    }
  };
  window.pagi_go = function (page) {
    var last_page = pagi_page;
    pagi_page = page;
    refresh_disp(last_page);
  };
  xhr.send();
}(window));
