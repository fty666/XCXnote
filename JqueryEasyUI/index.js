$(function () {
   $('#email').validatebox({
       //唯一，必须填
       required:true,
       //验证内容
       // validType:'email',
       // validType:'url',
       validType:'length[2,10]',
   })
});
