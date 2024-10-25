
function del(pid){
    if(confirm('Xóa sản phẩm này ! ')){
        document.form1.pid.value=pid;
        document.form1.command.value='delete';
        document.form1.submit();
    }
}
function clear_cart(){
    if(confirm('Bạn Chắc Có Muốn Xóa Giỏ Hàng Hay Không ? ')){
        document.form1.command.value='clear';
        document.form1.submit();
    }
}
function update_cart(){
    if(confirm('Cập nhật giỏ hàng của bạn ?')){
        document.form1.command.value='update';
        document.form1.submit();
    }
}



/*code button cong tru*/
$(document).ready(function(){
    $('.minius_cart').click(function(){
        var action=$(this).attr('data-action');
        var id_product=$(this).attr('data-id');
        var number_cart=$(this).parent().children('.number_cart').val();
        if(number_cart>1){
            number_cart=parseInt(number_cart)-1;
            $(this).parent().children('.number_cart').val(number_cart);
            update_cart_ajax($(this),action,id_product,number_cart);
        }
        return false;
    });

    $('.plus_cart').click(function(){
        var action=$(this).attr('data-action');
        var id_product=$(this).attr('data-id');
        var number_cart=$(this).parent().children('.number_cart').val();
        if(number_cart<101){
            number_cart=parseInt(number_cart)+1;
            $(this).parent().children('.number_cart').val(number_cart);
            update_cart_ajax($(this),action,id_product,number_cart);
        }
        return false;
    });

    function update_cart_ajax(element,action,id_product,quantity){
        $.ajax({
            url:'ajax/ajax_update_cart.php',
            data:{action:action,id_product:id_product,quantity:quantity},
            dataType:'json',
            type:'post',
            success:function(data){
                element.parents('tr').find('.price_p_cart').text(data.total_this);
                $('.price_all_cart').text(data.total_all);
            }
        });
    }
});
