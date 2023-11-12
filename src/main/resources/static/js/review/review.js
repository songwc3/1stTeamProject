$('#ajaxBtn').on('click', ajaxFn);
//$('#produtId').val(),

function ajaxFn(){

       var formData = new FormData();

        const productId = $('#productId').val();
        const review = $('#review').val();
        const reviewFile = $('#reviewFile')[0].files[0];

        formData.append('productId', $('#productId').val());
        formData.append('review', $('#review').val());
        formData.append('reviewFile',$('#reviewFile')[0].files[0]);

//     const data= {
//         'productId':$('#productId').val(),
//         'review':$('#review').val(),
//         'reviewFile':$('#reviewFile')[0]
//     }
//        console.log(data);

    console.log(formData);

     $.ajax({
        type:'POST',
        url:"/review/ajaxWrite",
        data: formData,
        contentType: false, // 파일 업로드 시 false로 설정
        processData: false,
        success:function(res){
            alert("댓글작성완료");
            console.log(res);
            let reData="<ul id="+ res.id+">";
    		    reData+="<li>"+res.reviewWriter+"</li>";
    		    reData+="<li>"+res.review+"</li>";
                reData+="<li>"+res.createTime+"</li>";
                reData+='<input type="button" value="삭제" onclick="onDelete('+res.id+')">'
                reData+="</ul>";

        $('#tData').append(reData);

    },
    error:()=>{
    	alert("Faill!!");
    }
});
// 작성초기화
$('#review').val("");
}


function reviewList(){
    const prId = $('#prId').val();
    console.log(prId)
    const data= {
            'productId':$('#productId').val()
        }

    $.ajax({
            url:"/review/reviewList/"+prId,
            data:data,
            type:"get",
            success:function(res){

            var reviewBody = $('#tData'); // tData를 변수에 삽입
            reviewBody.html(''); // tData 초기화
            console.log(res);
            let list ="";
            $.each(res, function(i, content){ // res= return data, i= key, content= value
                list="<ul id="+ content.id+">";
                list+="<li>"+content.reviewWriter+"</li>";
                list+="<li>"+content.review+"</li>";
                list+="<li>"+content.createTime+"</li>";
                list+='<input type="button" value="삭제" onclick="onDelete('+content.id+')">'
                list+="</ul>";


              $('#tData').append(list);
            });
        }
    });

}




function onDelete(id){
    console.log(id)
    console.log("delete")
    var delData= id;
    console.log(delData)
    $.ajax({
        url:"/review/delete/"+id,
        type:'POST',
        data:delData,
        success:function(res){
        if(res==1){
            alert("삭제성공");
        }else{
            alert("삭제실패");
        }
        reviewList();
        },
        error:()=>{
            	alert("Faill!!");
        }

    })

}

var comment = {
    init:function(){``
        var _this = this;
const upBtn = document.querySelectorAll('.reviewUpBtn');

upBtn.forEach(function(item){
    item.addEventListener('click', function(){
        var form = this.closest('form');
        _this.update(form);
            });

        });
    },
    update: function(form){
        var data= {
            id: form.querySelector('#reviewId').value,
            review: form.querySelector('#upRv').value,
            reviewWriter: form.querySelector('#reviewWriter').value
        };

        var split = location.pathname.split('/');
        var articleId = split[split.length - 1];

        fetch('/review/up'+data.id, {
            method: 'PUT', // PUT: 서버의 데이터를 갱신 작성
            body: JSON.stringify(data),
            headers:{
                'Content-Type' : 'application/json'
            }
        }).ten(function(res){
            if(res==1){
                alert('댓글 수정완료')
            }else{
                alert('댓글 수정실패')
            }
            reviewList();
        });
    }
};
// 객체 초기화
comment.init();









