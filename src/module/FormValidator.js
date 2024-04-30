export default class {
    constructor(formData, errorClass = 'text-danger') {
        this.formData = formData;
        this.errorClass = errorClass;
        this.errors = [];
        this.validationFields= [];
    }
    setValidationFields(fields) {
        this.validationFields = fields;
    }
    fsubmit() {
        if (this.fvalidate()) {
            this.form.submit()
            console.log('form is submited');
        }
    }
    f_email(fieldName, fieldValue, param) {
        //console.log(element.value);
        if (fieldValue && !/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(fieldValue)) {
            this.addError(fieldName, '' + fieldName + ' value is not a valid email');
            this.setValidationState(false);
        }
        
    }
    f_required(fieldName, fieldValue, param) {
        //console.log(element.value);    
        if (!fieldValue) {
            this.addError(fieldName, '' + fieldName + ' is required can not be empty');
            this.setValidationState(false);
        }
    }
    f_minLength(fieldName, fieldValue, param) {
        if (fieldValue && fieldValue.length < param) {
            this.addError(fieldName, '' + fieldName + ' is must be ' + param + ' character');
            this.setValidationState(false);
        }
    }
    f_maxLength(fieldName, fieldValue, param) {
        if (fieldValue && fieldValue.length > param) {
            this.addError(fieldName, '' + fieldName + ' is must be up to ' + param + ' character');
            this.setValidationState(false);
        }
    }
    f_oneSmallAlphabet(fieldName, fieldValue, param) {
        if (fieldValue && !/[a-z]/.test(fieldValue)) {
            this.addError(fieldName, '' + fieldName + 'Should have at least one small latter');
            this.setValidationState(false);
        };
    }
    f_oneUpperCaseAlphabet(fieldName, fieldValue, param) {
        if (fieldValue && !/[A-Z]/.test(fieldValue)) {
            this.addError(fieldName, '' + fieldName + 'Should have at least one capital latter');
            this.setValidationState(false);
        };
    }
    f_number(fieldName, fieldValue, param) {
        if (fieldValue && !/[0-9]/.test(fieldValue)) {
            this.addError(fieldName, '' + fieldName + 'only numbers are allowed ');
            this.setValidationState(false);
        };
    }
    fvalidate() {        
        if(this.validateOnInput === true){
            this.addListerToFields();
        }
            this.errors = [];
            for (const fieldName in this.validationFields) {               
                let fieldValue = this.formData[fieldName];
                if (this.validationFields.hasOwnProperty(fieldName)) {
                    const fieldParams = this.validationFields[fieldName];                    
                    for (const paramName in fieldParams) {
                        //debugger
                        if (fieldParams.hasOwnProperty(paramName)) {
                            const paramValue = fieldParams[paramName];
                            const methodName = 'f_' + paramName;
                            if (typeof this[methodName] === 'function') {
                                //console.log("method"+methodName+"and param"+paramName)
                                this[methodName](fieldName, fieldValue, paramValue);
                            } else {
                                console.log(`Method '${methodName}' is not defined in the class.`);
                            }
                        }
                    }
                }
            }
            //this.showAllError();          

        return this.validated;
    }
    addListerToFields(){
        //debugger
        for(const fieldName in this.validationFields){
            let element = document.getElementById(fieldName);
            element.addEventListener('input', (e)=>{
                //console.log("fieldName = "+fieldName+" and  value is "+e.target.value );
                    if (this.validationFields.hasOwnProperty(fieldName)) {
                    this.errors[element.id] = []        
                    const fieldParams = this.validationFields[fieldName];                    
                    for (const paramName in fieldParams) {
                        //debugger
                        if (fieldParams.hasOwnProperty(paramName)) {
                            const paramValue = fieldParams[paramName];
                            const methodName = 'f_' + paramName;
                                if (typeof this[methodName] === 'function') {
                                    //console.log("method"+methodName+"and param"+paramName)
                                    this[methodName](element, paramValue);
                                } else {
                                    console.log(`Method '${methodName}' is not defined in the class.`);
                                }
                            }
                        }
                        this.showElementError(element.id)
                    }
            })
        }
    }
    addError(elementId, message) {
        //debugger	
        if (!this.errors[elementId]) {
            this.errors[elementId] = [];
        }
        if(!this.errors[elementId].includes(message)){
            this.errors[elementId].push(message);
            //console.log("element"+elementId+"message"+message+"added");
        }
    }
    addMessage(element, message) {
        let errorElement = document.getElementById('' + element.id + '_error');
        let li = document.createElement('li');
        li.innerText = message;
        this.addError(element.id, message);
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.id = element.name + '_error';
        }
        errorElement.append(li);
        errorElement.className = this.errorClass;
        element.after(errorElement);
    }
    getElementError(elementId) {
        return this.errors[elementId];
    }
    showElementError(elementId){
        let errorElement = document.getElementById('' + elementId + '_error');
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.id = '' + elementId + '_error';
            }
            errorElement.innerHTML = ' ';
            let li = '';
            this.getElementError(elementId).forEach( message => { 
                // let li = document.createElement('li');
                // li.innerText = message; 
                li += '<li>'+message+'</li>';                 
                
            });
            errorElement.innerHTML = li;
            //errorElement.append(this.getElementError(elementId).toString());
            errorElement.className = this.errorClass;
            document.getElementById(elementId).after(errorElement);
    }
    showAllError() {   
                             
        let elementIds = (Object.keys(this.errors));
        elementIds.forEach( elementId => {                        
            this.showElementError(elementId);
        })
    }
    setValidationState(status) {
        if (!status) {
            this.validated = status;
        }
    }
}