
/**
 * -----------------------------------
 * Is JSON
 * -----------------------------------
 * Checks if the string passed is JSON Data
 * @param string str 
 * @returns `boolen`
 */
 function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}



/**
 * -----------------------------------
 * Is Undefined
 * -----------------------------------
 * checks if value passed is undefined 
 * @param val 
 * @returns `boolen`
 */
function isUndefined(val){
    if(val == null && val !=false){
        return true;
    }else{
        return false;
    }
}



/**
 * -----------------------------------
 * Is defined
 * -----------------------------------
 * checks if value passed is defined 
 * @param val 
 * @returns `boolen`
 */
 function isDefined(val,empty = false){
    if(empty){
        if(val == ""){
            return true;
        }else{
            return false
        }
    }else{
        if(val != null && val !=false){
            return true;
        }else{
            return false;
        }
    }   
    
    
}



/**
 * -----------------------------------
 * key
 * -----------------------------------
 * generates random string
 * @param length -the length of the string to be generated 
 * @returns `boolen`
 */
function key(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}



/**
 * -----------------------------------
 * pathFilename
 * -----------------------------------
 * returns the file name from an input element value
 * @param fullPath -value from the file input
 * @returns `string`
 */
function pathFilename(fullPath) {
    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        return filename;
    }
}


/**
 * -----------------------------------
 * PrintElem
 * -----------------------------------
 * Prints an element
 * @param elem - the `id` of the element
 * @returns `action`
 */
function PrintElem(elem)
{   var headContent = document.getElementsByTagName('head')[0].innerHTML; /// getting contents of the header
    var w = window.innerWidth;
    var h = window.innerHeight;
    var mywindow = window.open('', '_blank', 'width='+w+',height='+h+'fullscreen=yes');

    mywindow.document.write('<html><head>'+headContent);
    mywindow.document.write('<style> button{ display:none; } p{ font-size:1rem; } </style>')
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/



    setTimeout(function(){ 
        mywindow.print(); 
        mywindow.close();
    
    }, 600);

    // mywindow.print();
    // mywindow.close();

    return true;
}


/**
 * -----------------------------------
 * characterCount
 * -----------------------------------
 * counts the occurence of a character in a word
 * @param word - sentence or string of characters
 * @param character - the charater to check or count
 * @returns `int`
 */
function characterCount(word, character) {

    //initialize the counter to 0
    var count = 0;
    //loop through the word
     for (i = 0; i < word.length; i++) {
        //if the character in the word is equal to  the character passed in as a parameter increment count
        if (word[i] == character) {
            count++;
        }
   }
 
   //return the sentence. 
   return count;
 }



/**
 * -----------------------------------
 * replace_last_occurrence
 * -----------------------------------
 * replaces the last occurrence of a character
 * @param character - the character or string to watch out for
 * @param replacement - the replacement
 * @param string - the string housing the character and where replacement would take place
 * @returns `string`
 */
function replace_last_occurrence(character,replacement,string){
    var str = string;
    var word = character;
    var newWord = replacement;

    // find the index of last time word was used
    // please note lastIndexOf() is case sensitive
    var n = str.lastIndexOf(word);

    // slice the string in 2, one from the start to the lastIndexOf
    // and then replace the word in the rest
    str = str.slice(0, n) + str.slice(n).replace(word, newWord);
    return str;
}


/**
 * -----------------------------------
 * getNum
 * -----------------------------------
 * returns a number format, adds comma when necessary
 * @param val - number value to perform the assessment on
 * @returns `int`
 */
  function getNum(val){
      val = String(val);
    var occurrence = characterCount(val,'.');
    // VERIFYING NUMBER OF FULL STOP
    if(occurrence > 1){
        counter = 0
        for(counter=1;counter<occurrence; counter++){
            val = replace_last_occurrence('.','',val);
            val = val.trim();
        }
    }

    if(occurrence == 1){
        val = val.split('.');
        decimal = val[1];
        val = val[0];
        val = numeral(val).format('0,0');
        decimal = numberOnly(decimal);
        return val+'.'+decimal;
    }

    if(occurrence == 0){
        val = numeral(val).format('0,0');
        return val;
    }



    return val;
  }


/**
 * -----------------------------------
 * numberOnly
 * -----------------------------------
 * removes alphabets and characters and returns only numbers
 * @param _str - number value to perform the assessment on
 * @returns `int`
 */
  function numberOnly(_str){
    if(_str.trim() != ''){
        var arr = _str.split('');
        var out = new Array();
        if(arr[0] == '0' && arr.length > 1){
            zero = '0';
        }else{
            zero = '';
        }
        for(var cnt=0;cnt<arr.length;cnt++){
            if(isNaN(arr[cnt])==false || arr[cnt] == '0'){
                out.push(arr[cnt]);
            }
        }
        return _str = zero+Number(out.join(''));
    }else{
        return _str;
    }
  }


/**
 * -----------------------------------
 * animateCSS
 * -----------------------------------
 * performs animation on an element
 * @param element - the element in css query selector style
 * @param animation - the type of animation to peform
 * @param speed - the spead of the animation eg `0.5s`
 * @param prefix - default `animate__`
 * @returns `int`
 */
  const animateCSS = (element, animation,speed = '0.5s', prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.style.setProperty('--animate-duration',speed);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });


/**
 * -----------------------------------
 * searchDeep
 * -----------------------------------
 * performs a deep search returns true if all words in the needles is contained in the haystack
 * @param needles - the words to search for
 * @param haystack - where to check for each word;
 * @returns `boolen`
 */
function searchDeep(needles,haystack){
    //make both needle and haystack lower case to make search case insensitive
    needles = needles.toLowerCase(); 
    haystack = haystack.toLowerCase();

    //spliting the needles
    needles = needles.split(' ');
    count = needles.length; // counting how many words are present
    counter = 0; //creating a counter to check validation

    //checking if each needle exist in the haystack
    for(x = 0; x<count; x++){
        if(haystack.search(needles[x]) >=0){
            counter++;
        }
    }

    //returning true if all needles exist and false otherwise
    return (counter == count)? true: false;

}






/**
 * -----------------------------------
 * Prerforms Hide On Blur
 * -----------------------------------
 * Applies the hide on blur attribute to an element. Elementh must be transfater as JQuery Element
 * @param `el` Object
 * @returns `boolen`
 */
function hideOnBlur(el){
    el.attr('hhhiiidddeee_on_bbbllluuurrr','');
}

/**
 * -----------------------------------
 * Prerforms Hide On Blur
 * -----------------------------------
 * Hides and element once an area not in the element is clicked. USES: Jquery
 * @returns `boolen`
 */
function doHideOnBlur(){
    $(document).mouseup(function(e) 
    {
        var container = $("[hhhiiidddeee_on_bbbllluuurrr]");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) 
        {
            container.each(function(){
                $(this).hide();
                $(this).removeAttr('hhhiiidddeee_on_bbbllluuurrr');
                return true;
            });
        }
    });
}
doHideOnBlur();



/**
 * -----------------------------------
 * Event Validate Element
 * -----------------------------------
 * Validates where or not the element in the event has an attribute.
 * @param e `event Object`
 * @param attribute `string`
 * @returns `boolen`
 */
function eventValidElement(e,attribute){
    let count = 0;
    attrs = e.target.attributes;

    for (let i = 0; i < attrs.length; i++) {
        attr = attrs[i];

        if(attr['localName'] == attribute){
            count++;
        }        
    }
    return count;
}




  

const getIt = function (array, what) {
    if (array) {
      return array[what] || '';
    } else {
      return '';
    }
  };



  //converst files size
  function niceBytes(x){
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
     let l = 0, n = parseInt(x, 10) || 0;
     while(n >= 1024 && ++l){
         n = n/1024;
     }
     return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
   }

 //converst files size
   function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}




function creditCardType(cc) {
    let amex = new RegExp('^3[47][0-9]{13}$');
    let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
    let cup1 = new RegExp('^62[0-9]{14}[0-9]*$');
    let cup2 = new RegExp('^81[0-9]{14}[0-9]*$');
   
    let mastercard = new RegExp('^5[1-5][0-9]{14}$');
    let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');
   
    let disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
    let disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
    let disco3 = new RegExp('^6[45][0-9]{14}[0-9]*$');
    
    let diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');
    let jcb =  new RegExp('^35[0-9]{14}[0-9]*$');
   
   
    if (visa.test(cc)) {
      return 'VISA';
    }
    if (amex.test(cc)) {
      return 'AMEX';
    }
    if (mastercard.test(cc) || mastercard2.test(cc)) {
      return 'MASTERCARD';
    }
    if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
      return 'DISCOVER';
    }
    if (diners.test(cc)) {
      return 'DINERS';
    }
    if (jcb.test(cc)) {
      return 'JCB';
    }
    if (cup1.test(cc) || cup2.test(cc)) {
      return 'CHINA_UNION_PAY';
    }
    return undefined;
  }