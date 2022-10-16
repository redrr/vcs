function initFullSearch(j) {
    let dataHandler;
    let showAll = '';
    let inputClass = '';
    let selectClass = '';
    let columns = [];
    let clearElement = '<a style="padding: 5px; cursor: pointer">x</a>';

    if (j.css !== undefined) {
        inputClass = safeSetter(j.css.inputClass);
        selectClass = safeSetter(j.css.selectClass);
    }
    if (j.locale !== undefined) {
        showAll = safeSetter(j.locale.showAll);
    }
    if (j.clear !== undefined) {
        clearElement = safeSetter(j.clear);
    }
    if (j.columns !== undefined) {
      columns = safeSetter(j.columns);
    }
    if (j.dataSource !== undefined) {
      dataHandler = safeSetter(j.dataSource);
    }

    $('table').each(function () {
        let sFields = '<tr>';
        let table = $(this);
        columns.forEach(function (e, i, arr) {
            let searchFieldType = e.searchField;
            let extStyle = i === 0 ? 'margin-left: 40px!important;width: -webkit-fill-available;' : ''
            sFields += "<th>";
            if (i === 0) {
                sFields += "<div class='_fullsearch_clear' style='margin-left: -20px;"+(searchFieldType === 'disabled' ? '' : 'margin-bottom: -30px;')+"'>"+clearElement+"</div>"
            }
            if (searchFieldType !== 'disabled') {
                let sType = 'like';
                if (searchFieldType === 'enum' || searchFieldType === 'multienum') {
                    if (searchFieldType === 'multienum') {
                        sFields += '<select class="'+selectClass+' search-field show-tick" ' +
                            //'searchtype="exact" ' +
                            'data-src="' + e.data + '"' +
                            'data-size="5" ' +
                            'data-style="dtSelect" ' +
                            'multiple ' +
                            'data-selected-text-format="count" ' +
                            'data-live-search="true"' +
                            'style="' + extStyle + '"' +
                            'data-search="">';
                    } else {
                        sFields += '<select class="'+selectClass+' search-field" ' +
                            //'searchtype="exact" ' +
                            'data-src="' + e.data + '"' +
                            'data-size="5" ' +
                            'data-style="dtSelect" ' +
                            'data-live-search="true"' +
                            'style="' + extStyle + '"' +
                            'data-search="">' +
                            '<option value="" selected>'+showAll+'</option>';
                    }
                    sFields += '</select>';
                } else {
                    let sFieldType = 'text';
                    let df;
                    let id = "_fullsearch_field_"+i;
                    if (searchFieldType !== undefined || searchFieldType !== '') {
                        sFieldType = searchFieldType;
                        if (searchFieldType === 'datetime') {
                            df = 'Y-m-d';
                            if ($(e).attr("dateformat") !== undefined) {
                                df = $(e).attr("dateformat");
                            }
                        }
                    }
                    if ($(e).attr("searchType") === 'exact') {
                        sType = "exact";
                    }
                    sFields += '<input id="'+id+'" ' +
                                  'class="'+inputClass+' search-field" ' +
                                  'type="'+sFieldType+'" ' +
                                  'searchType="'+sType+'"'+(df === undefined ? '' : ' format="'+df+'"')+' ' +
                                  'style="' + extStyle + '"' +
                                  'value=""/>';
                }
            }
            sFields += "</th>";
        });
        sFields += '</tr>'
        table.find('tfoot').html(sFields);
        let clearBtn = table.find('._fullsearch_clear');
        clearBtn.parent().css("padding-left", "16px");
        clearBtn.on("click", function () {
            let inputs = $(this).parent().parent().find('.search-field');
            inputs.val("");
            inputs.trigger("change");
        })

        $('table tfoot select').each(function (i, e) {
          let f = $(e).attr("data-src")
          $.get(dataHandler.toString().concat("/").concat(f), function (resp) {
            let arr = JSON.parse(resp)
            let selection = $(e).html()
            for (j = 0; j < arr.length; j++) {
              selection += "<option value='"+arr[j]+"'>"+arr[j]+"</option>"
            }
            $(e).html(selection)
            $(e).selectpicker('refresh');
          })
        })
        table.find('input[type="date"]').flatpickr({
            mode: "single",
            dateFormat: "Y-m-d",
            onChange    :   function (selectedDates, dateStr, instance) {
                let input = $(this.element);
                input.val(dateStr);
                input.trigger("change");
            }
        });
        table.find('input[type="multidate"]').flatpickr({
            mode: "multiple",
            dateFormat: "Y-m-d",
            onChange    :   function (selectedDates, dateStr, instance) {
                let input = $(this.element);
                input.val(dateStr);
                input.attr('data-search', dateStr.toString().split(', ').join('&&'));
                input.trigger("change");
            }
        });
        table.find('input[type="datetime"]').flatpickr({
            mode: "single",
            dateFormat: "Y-m-d H:i",
            enableTime: true,
            onChange    :   function (selectedDates, dateStr, instance) {
                let input = $(this.element);
                input.val(dateStr);
                input.trigger("change");
            }
        });
        table.find('input[type="daterange"]').flatpickr({
            mode: "range",
            dateFormat: "Y-m-d",
            onChange    :   function (selectedDates, dateStr, instance) {
                let input = $(this.element);
                input.val(dateStr);
                input.trigger("change");
            }
        });
        table.find('tfoot select').selectpicker().on("change", function () {
            $(this).attr('data-search',$.makeArray($(this).selectpicker('val')).join('&&'));
        })
    })
}

function applyFullSearch(o) {
    o.api().columns().every(function () {
        let that = this;
        let input = $(".search-field", this.footer());
        input.on('change', function (ev) {
            let searchTerm = this.value;
            console.log($(this))
            if ($(this).attr("data-search") !== undefined && $(this).attr("data-search") !== "") {
                searchTerm = $(this).attr("data-search");
            }
            if ($(this).attr("searchType") === 'exact') {
                console.log(searchTerm);
                if (!searchTerm.toString().includes('&&')) {
                    searchTerm = $.fn.dataTable.util.escapeRegex(searchTerm);
                    that.columns(that[0]).search( searchTerm ? '^' + searchTerm + '$' : '', true, false).draw();
                } else {
                    that.columns(that[0]).search( searchTerm, true, false).draw();
                }
            } else {
                that.columns(that[0]).search(searchTerm).draw();
            }
        });
    });
}

function safeSetter(obj) {
    return obj === undefined ? '' : obj;
}
