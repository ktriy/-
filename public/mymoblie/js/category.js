$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
    });
    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        success:function(response){
            var html=template("tpl",{data:response.rows});
            $(".waper").html(html);

            if(response.rows.length>0){
                var id = response.rows[0].id;
                $.ajax({
                    type:"get",
                    url:"/category/querySecondCategory",
                    data:{
                        id:id
                    },
                    success:function(result){
                        var html = template("second",{list:result.rows});
                        $(".mui-right-22").html(html);
                        $(".waper").find("li:first-child").addClass("active");

                    }
                })
            }

        }
    })





    $(".waper").on("click","a",function(){
        var index = $(this).attr("data-id");
        $(this).parent("li").addClass("active").siblings().removeClass("active");
       $.ajax({
           type:"get",
           url:"/category/querySecondCategory",
           data:{
               id:index,
           },
           success:function(result){
               var html = template("second",{list:result.rows});
               $(".mui-right-22").html(html);

           }
       })
    })
})
