# inputValidator
A javascript library to check and validate your HTML forms
* this library supports inputs,textareas and select tags
</br>

## Get Started
First thing you need to do to start validating your forms is to add this library to your html page.</br>
<b>! This library requires <i>JQUERY</i></b>
```
<!-- Jquery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<!-- inputValidator -->
<script src="./inputValidator.js"></script>
```
</br>

## Start Validation
To validate your form, you need to create an object from <b>inputValidator</b> class and give it the options you want (optional)
<b>! Options are not required </b></br>
```
//!!! inputValidator REQUIRES JQUERY
$('document').ready(function(){

    //Creating a new object from inputValidator class and setting the options
    var iv = new inputValidator("formId",{

       //Min length of the input value (default: 6)(Checks all of the inputs)
       inputMinLength: 10,

       //Max length of the input value (default: 20)(Checks all of the inputs)
       inputMaxLength: 15,

       //Ignores general length Check
       ignoreGeneralLength: true,

       //Sets specific length range for each element
       inputsLengthRange:{

           //Works with name attr of the element
           username: [3,10],
           password: [10,20]

       },

       //Ignores specific elements validation (Works with name attr)
       ignoreElements: ['password'],

       //Sets illegal characters
       //Default: ["!","@","#","$","%","^","&","*","(",")","-","+","=","[","]","{","}",";",",","/","?",">","<","~","|"," "]
       illegalChars: ['-','='],

       //Sets css styles for the element error has occured on (Default is no style)
       style: "border-color:red;color:red;"

    });

    $("#formId").submit(function(e){

        if(iv.validate() === false){
            e.preventDefault();
            console.log(iv.error);
        }
                
     });

});
```    
</br>

## Options
Here we check the options of the inputValidator class
</br>

#### - Inputs General Length Check
If <b>ignoreGeneralLenght</b> is set to false (default is false), you can set min and max for length of your inputs,textareas and select tags and all of them will be checked by the same min and max.
</br>
```
ignoreGeneralLength: false, //Default is false
inputMinLength: 4, //Default is 6
inputMaxLength:15 //Default is 20
```
</br>

#### - Inputs Specific Length Range
If you want to give specific min and max for each of your form elements you can use <b>inputsLengthRange</b>. this option needs an object containing the name attribute of the elements and length range for each.
* You can't use inputsLengthRange and general length check at the same time

```
ignoreGeneralLength: true, //Default is false
inputsLengthRange: {
  name1: [3,10],
  name2: [6,12]
}
```
</br>

#### - Illegal Characters
This option can't be turned off and always works. this filter checks for illegal signs like @,& and etc in your inputs. you can change the illegal characters in options if you want.
</br>
```
illegalChars = ['-','='],
//Default: ["!","@","#","$","%","^","&","*","(",")","-","+","=","[","]","{","}",";",",","/","?",">","<","~","|"," "]
```

#### - Style
You can add css styles to be applied on the element which the error has occured on.</br>
```
style: "border-color:red;color:red",
//Default: none
```

#### - Ignore Element
You can ignore some of your elements if you want. You can use <b>ignoreElements</b> option that needs an array of name attributes of the lements.</br>
```
ignoreElements: ["name1","name2"],
//Default: none
```
</br>
</br>

### Example
You can find the example in the <b>Example</b> directory.
<b>Designed by [khashayar77](https://github.com/khashayar77)</b>
