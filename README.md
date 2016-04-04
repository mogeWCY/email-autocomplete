# email-autocomplete
A  email autocomplete  webcompent by pure js  and it can suggest and autocompletes the domain  ending
一个邮箱后缀自动完成组件，由原生js编写
<code>
	<input type="text" id='search'>
	<div >
		<ul id="suggest">
		   <!--li中没有a标签获取，li的innerText值后跳转到比如baidu.com?keyword+value-->
		</ul>
	</div>
</code>
	```var auto=new EmailAutocomplete({
         emailInputId:'search',
         suggestListId:'suggest',
         domains:["qq.com","163.com","gmail.com","126.com","sina.com",'189.com','123.com'],
         listStyles:{
         },
         ulStyles:{
            fontSize:'20px',
            width:'200px',
            listStyleType:'none',
            margin:'0px',
            padding:'0px'
         },
         chooseColor:'red',
         onSelected:function(){
             console.log('hello');
         }
	```

