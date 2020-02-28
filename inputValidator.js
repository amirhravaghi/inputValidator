/* 
** input validator
** Developed by AmirHosein Ravaghi
** V1.0 Beta
** !REQUIRES JQUERY
*/

class inputValidator{

    //Setting default options
    //Form identifier
    formId = "";
    
    //Default min of length range (General)
    inputMinLength = 6;

    //Default max of length range (General)
    inputMaxLength = 20;

    //Ignoring specific elements
    ignoreElements = undefined;

    //Ignoring general range check
    ignoreGeneralLength = false;

    //Setting min and max for length range of specific inputs
    inputsLengthRange = undefined;

    //Default illegal characters
    illegalChars = ["!","@","#","$","%","^","&","*","(",")","-","+","=","[","]","{","}",";",",","/","?",">","<","~","|"," "];
    
    //Error if existed
    error = "";

    //Style of the input which error occurs on
    style = "";

    //Constructor
    constructor(formId,options){
        if(options !== undefined){
            var options = options;
            this.inputMaxLength = options.hasOwnProperty('inputMaxLength') ? options.inputMaxLength : this.inputMaxLength;
            this.inputMinLength = options.hasOwnProperty('inputMinLength') ? options.inputMinLength : this.inputMinLength;
            this.illegalChars = options.hasOwnProperty('illegalChars') ? options.illegalChars : this.illegalChars;
            this.style = options.hasOwnProperty('style') ? options.style : this.style;
            this.ignoreGeneralLength = options.hasOwnProperty('ignoreGeneralLength') ? options.ignoreGeneralLength : this.ignoreGeneralLength;
            this.inputsLengthRange = options.hasOwnProperty('inputsLengthRange') ? options.inputsLengthRange : this.inputsLengthRange;
            this.ignoreElements = options.hasOwnProperty('ignoreElements') ? options.ignoreElements : this.ignoreElements;
        };
        this.formId = formId;
    }

    //Splitting css styles into an array
    styleDecoder(){
        let style = this.style;
        let firstLayerStyles = style.split(";");
        var array = [];
        for(var i=0;i<firstLayerStyles.length;i++){
            let secondLayerStyles = firstLayerStyles[i].split(":");
            array.push([]);
            array[i].push(secondLayerStyles[0]);
            array[i].push(secondLayerStyles[1]);
        }
        return array;
    }

    //Setting styles on an object
    styleSetter(obj){
        let styles = this.styleDecoder();
        for(var i=0;i<styles.length;i++){
            $(obj).css(styles[i][0],styles[i][1]);
        }
    }

    //Getting all children elements of the form
    getChildren(){
        var formId = this.formId;
        var children = $("#"+formId+" *");
        var childrenSize = children.length;
        return {
            "children": children,
            "childrenSize": childrenSize
        };
    }

    //Validating the form
    validate(){
        //Setting variables
        let childrenObj = this.getChildren();
        var children = childrenObj.children;
        var ie = this.ignoreElements;
        //Checks and validates every form field supported(input,textarea,select)
        for(var i=0;i<childrenObj.childrenSize;i++){

            //Empty the error
            this.error = "";

            //Getting element name
            var childName = $(children[i]).attr("name");

            //Getting tag name
            let tagName = $(children[i]).prop("tagName").toLowerCase();

            //Checks if the element is supported
            if(tagName != "input" && tagName != "textarea" && tagName != "select"){
                continue;
            }
            if($(children[i]).attr("type") == "submit"){
                continue;
            }
            
            //Checking for ignored elements
            if(ie !== undefined){
                var ieSize = ie.length;
            }
            for(var k=0;k<ieSize;k++){
                if(childName == this.ignoreElements[k]){
                    var ignore = true;
                }
            }

            if(ignore){
                continue;
            }
            
            //Getting the value of the element
            var val = $(children[i]).val();

            //Checks the length validation
            if(!this.ignoreGeneralLength){
                if(tagName != "select"){
                    if( val.length > this.inputMaxLength || val.length < this.inputMinLength){
                        //Setting the error
                        this.error = "Input length is out of the range!!";
                        //Setting the styles
                        this.styleSetter(children[i]);
                        //Returning the validation result
                        return false;
                    }
                }
            }
            else{
                //Checking for inputLengthRange
                if(this.inputsLengthRange !== undefined){ 
                    var name;
                    for(name in this.inputsLengthRange){
                        //Checking for inputs which are told in the inputLengthRange
                        var name;
                        if(name == childName){
                            let range = this.inputsLengthRange[name];
                            if(tagName != "select"){
                                if( val.length > range[1] || val.length < range[0]){
                                    //Setting the error
                                    this.error = "Input length is out of the range!!";
                                    //Setting the styles
                                    this.styleSetter(children[i]);
                                    //Returning the validation result
                                    return false;
                                }
                            }
                        }
                    }
                }
            }
            //Checking for illegal characters
            for(var j=0;j<this.illegalChars.length;j++){
                if(val.includes(this.illegalChars[j])){
                    this.error = "Input contains illegal characters";
                    this.styleSetter(children[i]);
                    return false;
                }
            }
        }
        return true;
    }

}
