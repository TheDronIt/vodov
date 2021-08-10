function searchf(search, currentEl) {
    var fdata = new FormData();

    fdata.append("q", search);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "search/post",
        type: "POST",
        data: fdata,
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            var autoCompleteHTML = "";
            if (data.result) {
                data.result.forEach(function(item) {
                    autoCompleteHTML += "<li action='PUT_IN_SEARCH'>" + item.title + "</li>";
                });
            }

            // if(autoCompleteHTML != "") $(currentEl).parent().find(".autocomplete").addClass("active");
            // else $(currentEl).parent().find(".autocomplete").removeClass("active");

            $(currentEl)
                .parent()
                .find(".autocomplete")
                .html(autoCompleteHTML);
        },
        error: function(data) {}
    });

    return false;
}

// РѕС‚РїСЂР°РІРєР° Р·Р°РїСЂРѕСЃР° РЅР° Р°РєС‚ СЃРІРµСЂРєРё
function sendActReconciliation() {
    var fdata = new FormData(),
        select = $("#actsCompany").val(),
        period = $("#actsDates")
            .val()
            .replace(/ /g, "");
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    if (select === "") {
        showSystemPopup("Р’РЅРёРјР°РЅРёРµ", "Р’С‹Р±РµСЂРёС‚Рµ РєРѕРјРїР°РЅРёСЋ");
        return false;
    }

    if (period === "") {
        showSystemPopup("Р’РЅРёРјР°РЅРёРµ", "Р’С‹Р±РµСЂРёС‚Рµ РїРµСЂРёРѕРґ");
        return false;
    }

    fdata.append("client_id", select);
    fdata.append("period", period);

    $.ajax({
        url: "/cabinet/act-reconciliation",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // $("#act_answer").html(data.message);
            // $("#act_answer").show();
            // console.log(data);

            showSystemPopup("РЈСЃРїРµС…", data.message);
        },
        error: function(data) {
            // alert(data.responseJSON.message);
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

function setOption(obj) {
    var fdata = new FormData();

    fdata.append("name", obj.key);
    fdata.append("value", obj.value);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/user/set-option",
        type: "POST",
        data: fdata,
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        // success: function(data) {
        //     alert(data.message);
        // },
        error: function(data) {
            console.log(data.responseJSON.message);
        }
    });

    return false;
}

function getOption(obj) {
    var fdata = new FormData();

    fdata.append("name", obj.key);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/user/get-option",
        type: "POST",
        data: fdata,
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (is("Function", obj.successCallback)) {
                obj.successCallback(data.value);
            }
        },
        error: function(data) {
            console.log(data.responseJSON.message);
        }
    });

    return false;
}

function string_gen(len) {
    chrs = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var str = '';
    for (var i = 0; i < len; i++) {
        var pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }
    return str;
}

function generation_user_token() {
    token = string_gen(32);
    
    $('#api_export_token').val(token);
}

function user_token_update() {
    var fdata = new FormData();

    fdata.append("token", $('#api_export_token').val());
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/cabinet/token-update",
        type: "POST",
        data: fdata,
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (is("Function", obj.successCallback)) {
                obj.successCallback(data.value);
            }
        },
        error: function(data) {
            console.log(data.responseJSON.message);
        }
    });

    return false;
}

function check_notification(type, event_id, element) {

    if(type == 'sms' && element.checked) {
        if(!$('#phone').val()) {
            $(element).removeAttr("checked");
            alert('Р’С‹ РґРѕР»Р¶РЅС‹ СѓРєР°Р·Р°С‚СЊ РєРѕРЅС‚Р°РєС‚РЅС‹Р№ С‚РµР»РµС„РѕРЅ.');     
        }
       
        var count_checked = $('input[data-СЃhannel-type|="sms"]:checked').length;
       
        if(count_checked>2) {
            $(element).removeAttr("checked");
            alert('Р’С‹ РЅРµ РјРѕР¶РµС‚Рµ РІС‹Р±СЂР°С‚СЊ Р±РѕР»СЊС€Рµ РґРІСѓС… РїСѓРЅРєС‚РѕРІ РґР»СЏ SMS.');     
        }
    }
    
    if(type == 'email' && event_id == 9 && !element.checked) {        
        element.checked = true;
        alert('Р”Р°РЅРЅРѕРµ РѕРїРѕРІРµС‰РµРЅРёРµ СЏРІР»СЏРµС‚СЃСЏ РѕР±СЏР·Р°С‚РµР»СЊРЅС‹Рј Рё РІС‹ РЅРµ РјРѕР¶РµС‚Рµ РµРіРѕ РѕС‚РјРµРЅРёС‚СЊ.');        
    }
}

function delete_order_files(order_id, file_id) {
    
    if(!confirm('Р’С‹ РґРµР№СЃС‚РІРёС‚РµР»СЊРЅРѕ С…РѕС‚РёС‚Рµ СѓРґР°Р»РёС‚СЊ С„Р°Р№Р»?')) {
        return false;
    }
    
    var fdata = new FormData();
      
    fdata.append("order_id", order_id);
    fdata.append("file_id", file_id);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/order/delete-file",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            location.reload();
            //window.location = window.location.protocol + "//" + window.location.hostname + "/cabinet/documents";
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
            location.reload();
        }
    });

    return false;
}

function upload_order_files(order_id, max_files) {
    var fdata = new FormData();

    var ins = $("input[id=upload_file]")[0].files.length;

    if (parseInt(ins)>max_files){
         alert("Р’С‹ РјРѕР¶РµС‚Рµ Р·Р°РіСЂСѓР·РёС‚СЊ РјР°РєСЃРёРјСѓРј "+max_files+" "(max_files == 1 ? 'С„Р°Р№Р»' : 'С„Р°Р№Р»Р°') );
    }

    for (var x = 0; x < ins; x++) {
        fdata.append("upload_file[]", $("input[id=upload_file]")[0].files[x]);
    }

    fdata.append("order_id", order_id);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/order/upload-files",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            location.reload();
            //window.location = window.location.protocol + "//" + window.location.hostname + "/cabinet/documents";
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
            location.reload();
        }
    });

    return false;
}

function trigger(item_id, trigger_id, callback) {
    var fdata = new FormData();

    fdata.append("item_id", item_id);
    fdata.append("trigger_id", trigger_id); // 1 / 2 / 1,2
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/user/set-trigger",
        type: "POST",
        data: fdata,
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
                         
            callback(data.is_trigger);
        },
        error: function(data) {
            //console.log(data.responseJSON.message);
        }
    });

    return false;
}

$(document).ready(function(){
 
    $(".diagram_trigger").click(function () {
        var self = $(this);
        
        var item_id = self.attr('data-id');
        var data_plan_date_receipt = Number(self.attr('data-plan-date-receipt'));
                
        trigger(item_id, 2, function (is_trigger) {
            
            is_trigger = Number(is_trigger);
            
            self.attr('data-trigger', is_trigger);           
            self.find('.svg_trigger').attr('fill', (is_trigger ? '#004B8A' : '#7A7A7A')  );
            
            if( data_plan_date_receipt && is_trigger ) {
                self.find('.trigger_text').html('РћР¶РёРґР°РµС‚Рµ РїРѕР»СѓС‡РµРЅРёСЏ РїРёСЃСЊРјР° Рѕ РїСЂРёС…РѕРґРµ С‚РѕРІР°СЂР°.');
            } else if( !data_plan_date_receipt && is_trigger ) { 
                self.find('.trigger_text').html('РћР¶РёРґР°РµС‚Рµ РїРѕР»СѓС‡РµРЅРёСЏ РїРёСЃСЊРјР° Рѕ РїРѕСЏРІР»РµРЅРёРё РїР»Р°РЅРѕРІРѕР№ РґР°С‚С‹ РїСЂРёС…РѕРґР° Рё Рѕ СЃР°РјРѕРј РїСЂРёС…РѕРґРµ С‚РѕРІР°СЂР°.');
            } else if( data_plan_date_receipt && !is_trigger ) {
                self.find('.trigger_text').html('РќР°Р¶РјРёС‚Рµ РЅР° РєРѕР»РѕРєРѕР»СЊС‡РёРє РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ РїРёСЃСЊРјР° Рѕ  РїСЂРёС…РѕРґРµ С‚РѕРІР°СЂР°.');
            } else {
                self.find('.trigger_text').html('РќР°Р¶РјРёС‚Рµ РЅР° РєРѕР»РѕРєРѕР»СЊС‡РёРє РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ РїРёСЃСЊРјР° Рѕ РїРѕСЏРІР»РµРЅРёРё РїР»Р°РЅРѕРІРѕР№ РґР°С‚С‹ РїСЂРёС…РѕРґР° Рё Рѕ СЃР°РјРѕРј РїСЂРёС…РѕРґРµ С‚РѕРІР°СЂР°.');
            } 
            
        });

        
        return false;
    });
    
});