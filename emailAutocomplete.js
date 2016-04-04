(function(window,document){
  var defaults={
     domains: ["qq.com", "163.com", "gmail.com", "126.com", "sina.com",  "outlook.com", "sohu.com"],
     chooseColor:'#eaeaea',
     listStyles:{
         
     },
     ulStyles:{
         fontSize:'20px',
         width:'200px',
         listStyleType:'none',
         margin:'0px',
         padding:'0px'
     }
  };
  var utils={
      isDOM: function (o) {
      return (
        typeof HTMLElement === 'object' ? o instanceof HTMLElement :
        o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'
      );
    },
    isSupportClassList:'classList' in document.body,
    merge: function (obj1, obj2) {
      var result = {};
      for (var prop in obj1) {
        if (obj2.hasOwnProperty(prop)) {
          result[prop] = obj2[prop];
        } else {
          result[prop] = obj1[prop];
        }
      }
      return result;
    },
    addClass:function(ele,cls){
        if(this.isSupportClassList){
           var classArr=cls.split(' ');
           for(var i=0,len=classArr.length;i<len;i++){
                  ele.classList.add(classArr[i]);
           }
           return;
        }       
        var classArr=cls.split(' ');//把以空格分开的类名分开，存为数组
        for(var i=0,len=classArr.length;i<len;i++){
        	if(!this.hasClass(ele,classArr[i])){
        		ele.className+=' '+classArr[i];
        	}
        }
    },
    removeClass:function(ele,cls){//cls为一个或多个类名
    	// cls中若删除多个类，中间以空格分开
           if(this.isSupportClassList){
              var classArr=cls.split(' ');
              for(var i=0,len=classArr.length;i<len;i++){
                  ele.classList.remove(classArr[i]);
              }
              return;
           }
           var myClassArr=ele.className.split(' ');
           var classArr=cls.split(' ');
           for(var i=0,len=classArr.length;i<len;i++){
               var k=myClassArr.indexOf(classArr[i]);
               if(k!=-1){
                  myClassArr.splice(k,1);
               }
           }
           ele.className=myClassArr.join(' ');
        },
    toggle:function(ele,cls){//cls只能为一个类名
      if(this.isSupportClassList){
         ele.classList.toggle(cls);
         return;
      }
      if(!this.hasClass(ele,cls)){
              this.addClass(ele,cls);
      }else{
           this.removeClass(ele,cls);
      }
    },
    hasClass:function(ele,cls){//cls只能为一个类名
      if(this.isSupportClassList){
        return ele.classList.contains(cls);
      }
      return (" " + ele.className + " ").indexOf(" " + cls + " ") > -1;
   },
   bind:function(elem,evt, func){
   	if (elem) {
			return elem.addEventListener ? elem.addEventListener(evt, func, false) : elem.attachEvent("on" + evt, func)
    }
  }
 };
function EmailAutocomplete(options){
	   this.emailInputId=options.emailInputId;
	   this.suggestListId=options.suggestListId;
	   this.domains=options.domains||defaults.domains;
     this.listStyles=options.listStyles||defaults.listStyles;
     this.ulStyles=options.ulStyles||defaults.ulStyles;
     this.chooseColor=options.chooseColor;
     this.onSelected=options.onSelected||function(){};
     this.template="<li data-index='{index}'>{data}</li>";
     this.activeIndex=-1;
     this.cacheValue="";
     this.init();
}
EmailAutocomplete.prototype={
	init:function(){
         this.cacheDOM();
         this.initStyle();
         this.bindEvents();
	},
	cacheDOM:function(){
		this.emailInput=document.getElementById(this.emailInputId);
		this.suggestContainer=document.getElementById(this.suggestListId);
		this.listItems=this.suggestContainer.getElementsByTagName('li');
	},
  initStyle:function(){
      var self=this;
      this.setStyle(this.suggestContainer,this.ulStyles);
      for(var i=0,len=this.listItems.length;i<len;i++){
         this.setStyle(this.listItems[i],this.listStyles)
      }
  },
  setStyle:function(el,styles){
     for(var i in styles){
       el.style[i]=styles[i];
     }
  },
	bindEvents:function(){
	   var self=this;
	   var emailInputValue=self.emailInput.value;
       var rgx=/[0-9]||[a-z]/g;
       var isNumOrLetter=rgx.test(emailInputValue[emailInputValue.indexOf('@')])||false;
       this.emailInput.addEventListener('keyup',function(e){
            var e=e||window.event;
             switch(e.keyCode){
             case 38://UP
             if(self.suggestContainer.style.display='block'){
                upKey.call(self);
            }
                break;
             case 40://DOWN
                if(self.suggestContainer.style.display='block'){
                      downKey.call(self);
                }
                break;
             case 27://ESC
                self.hide(self.suggestContainer);
                break;
             case 13://ENTER
                self.emailInput.value=self.listItems[self.activeIndex].innerHTML;
                self.onSelected();
                self.hide(self.suggestContainer);
                break;
              default:
               self.cacheValue=self.emailInput.value;
               if(self.emailInput.value.split('@').length==2&&isNumOrLetter){
            	      self.render();
                }
           }
       },false);
       document.addEventListener('click',function(e){
       	 var e=e||window.event;
       	 if(e.target.tagName.toLowerCase()=='li'){
                   	 var allUlChilds=self.suggestContainer.getElementsByTagName('*');
                     var index=[].indexOf.call(allUlChilds,e.target);
                     if(index!=-1){
                         self.emailInput.value=e.target.innerHTML;
                         self.onSelected();
                   }
       	 }
       	 if(e.target!==self.emailInput)
             self.hide(self.suggestContainer);
       },false);
       this.emailInput.addEventListener('focus',function(){
             if(self.emailInput.value.split('@').length==2&&isNumOrLetter){
             		 var len=self.emailInput.value.length;
             	     var isEndWithDotcom=(self.emailInput.value.slice(len-4,len)=='.com')?true:false;
            	     !isEndWithDotcom&&self.render();
                }
       },false);
	},
	show:function(ele){
      ele.style.display='block';
	},
	hide:function(ele){
      ele.style.display='none';
      this.activeIndex=-1;
	},
	addActive:function(ele){
		this.clearAllActive();
    ele.style.backgroundColor=this.chooseColor;
	},
	clearAllActive:function(){
       for(var i=0,len=this.listItems.length;i<len;i++){
       	  this.listItems[i].style.backgroundColor='';
       }
	},
	render:function(){
       var index=this.emailInput.value.indexOf('@');
       var afterKeyWord=this.emailInput.value.slice(index+1);
       var beforeKeyWord=this.emailInput.value.slice(0,index);
       var ulHtml="";
       for(var i=0,len=this.domains.length;i<len;i++){
       	 if(this.domains[i].indexOf(afterKeyWord)==0){
       	 	ulHtml+=this.template.replace('{data}',beforeKeyWord+'@'+this.domains[i]).replace('{index}',i);
       	 }
       }
       this.suggestContainer.innerHTML=ulHtml;
       this.show(this.suggestContainer);
	}
};
function upKey(){
    this.activeIndex--;
    if(this.activeIndex===-1){
      this.emailInput.value=this.cacheValue;
      this.clearAllActive();
      return;
    }
    if(this.activeIndex===-2){
      this.activeIndex=this.listItems.length-1;
    }
    this.addActive(this.listItems[this.activeIndex]);
    this.emailInput.value=this.listItems[this.activeIndex].innerHTML;
    this.onSelected();
}
function downKey(){
      this.activeIndex++;
    if(this.activeIndex===this.listItems.length){
      this.emailInput.value=this.cacheValue;
      this.activeIndex=-1;
      this.clearAllActive();
      return;
    }
    this.addActive(this.listItems[this.activeIndex]);
    this.emailInput.value=this.listItems[this.activeIndex].innerHTML;
    this.onSelected();
}
window.EmailAutocomplete=EmailAutocomplete;
})(window,document);
