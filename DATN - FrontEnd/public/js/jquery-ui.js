$(window).scroll(function () {
    var banner_top=$('.banner_top').innerHeight();
    var header=$('#header').innerHeight();
    var slider=$('#amazingslider-wrapper-1').innerHeight();
    var top_main=banner_top+header+slider;
    if ($(window).scrollTop() > top_main) {
        
     $('.fix_scroll').addClass('active');
 }
 else {
     $('.fix_scroll').removeClass('active');
 }
});
$(window).scroll(function(){ $(window).scrollTop()>145?$(".fixNav").addClass('fixed'):$(".fixNav").removeClass('fixed')});


$(".filter").change(function(event) {
    $.ajax({
        data: $("#frm_filter").serialize(),
        type: 'POST',
        url:'ajax/ajax_filter.php',
        enctype: 'multipart/form-data',
        success:function(data){
            $(".load_sanpham").html(data);
        }
    });
});

function loadData(page,id_tab){
    $.ajax 
    ({
        url: "ajax_paging/ajax_paging.php",
        type: "POST",
        data: {page:page,dieukien:$(id_tab).attr("rel"),sotrang:10},
        success: function(msg)
        {
            $(id_tab).html(msg);
            $(id_tab+" .pagination li.active").click(function(){
                var pager = $(this).attr("p");
                var id_tabr = $(this).parents('.hidden_tab').attr("id");
                var id_danhmucr = $(this).parents('.hidden_tab').attr("title");
                loadData(pager,"#"+id_tabr);
            });  
        }
    });

}