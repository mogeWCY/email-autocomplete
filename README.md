# email-autocomplete
##A  email autocomplete  webcompent by pure js  and it can suggest and autocompletes the domain  ending,and you can see the demo [here][1]
## example
```
	<input type="text" id='search'>
	<div >
		<ul id="suggest">
		</ul>
	</div>
```
```
  var auto=new EmailAutocomplete({
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
##install
```<script src='emailAutocomplete.js'></script>```
## API:
 1. **emailInputId**  : the ID of  email input
 2. **suggestListId** :the container of suggest list of email, it is the tag of ```ul```
 3. **domains**:Email Autocomplete has its own default domains if the domains option isn't provided.
     1. qq.com
     2. 163.com
     3. gmail.com
     4. 126.com
     5. sina.com 
     6. outlook.com
     7. sohu.com
 4. **listStyles**: the style of suggest list ,you can set the style of it ,just like set **font-size** with **fontSize** or set **margin-top** with **marginTop**.
 5. **ulStyles**: the style of the container of suggest list of email,you can set it 
 6. **chooseColor**: if the list was choosed,**chooseColor** is the color of background
 7. **onSelected** :if the list was choosed ,the **onSelected** is the function of callback

 [1]: http://mogewcy.github.io/demo/email-autocomplete/
