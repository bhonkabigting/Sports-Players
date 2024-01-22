/*
To use it, you first need to import the class by requiring the file where it is defined.
If you want to use it in your model you need to require it like this :
    const validator = require("../../libraries/Validator");

Once you have imported the class you need to set the rules:
    There are two ways to set the rules,
        First is by using the 'setRules' method like this:

            validator.setRules("field name", "data", ["required", "min-4", "max-5", "email", "alpha"]);
        
        Second is by assigning it directly to the 'rules' property like this:
        
            validator.rules = [
                ["First Name", student.first_name, ["required", "alpha"]],
                ["Last Name", student.last_name, ["required", "alpha"]],
                ["Email", student.email, ["email"]],
                ["Password", student.password, ["required", "min-8", "max-20"]],
                ["Password", student.confirm_password, [`match-${student.password}`]]
            ];

After we have set all the validation rules, we call the 'isValid' method.
If the data is invalid, the 'isValid' method returns false;
The 'validator.errors' array contains all the error messages generated during validation.
    This is an example on how to implement this.

        if (validator.isValid()) {
            this.insert(student);
            return ["Registration is successful."];
        }
        else {
            return validator.errors;
        }
*/

class Validator {
    constructor() {
        this.errors = [];
        this.tempErrors = [];
        this.tests = {
            "required": this.required,
            "alpha": this.alpha,
            "min": this.min,
            "max": this.max,
            "email": this.email,
            "match": this.match
        }
        this.rules = [];
    }

    required(field, data) {
        if (data.length < 1) {
            return `${field} is required.`;
        }
    }

    alpha(field, data) {
        const alphabets = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let valid = false;

        for (let i = 0; i < data.length; i++) {
            valid = false;

            for (let j = 0; j < alphabets.length; j++) {
                if (alphabets[j] == data[i]) {
                    valid = true;
                    break;
                }
            }

            if (!valid) {
                break;
            }
        }

        if (!valid) {
            return `${field} must contain alphabets only.`;
        }
    }

    min(field, data, num) {
        if (data.length < num) {
            return `${field} must be at least ${num} characters.`;
        }
    }

    match(field, data, data2) {
        if (data != data2) {
            return `${field} does not match.`; 
        }
    }

    max(field, data, num) {
        if (data.length > num) {
            return `${field} should not exceed ${num} characters.`;
        }
    }

    email(field, data) {
        const result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(data);

        if (!result) {
            return `${field} is invalid.`;
        }
    }

    isValid() {
        const rules = this.rules;
        this.rules = [];
        this.errors = [];

        for (let i = 0; i < rules.length; i++) {
            this.validate(rules[i][0], rules[i][1], rules[i][2]);
        }

        if (this.errors.length > 0) {
            return false
        }
        return true;
    }

    setRules(field, data, tests) {
        this.rules[this.rules.length] = [field, data, tests];
    }

    validate(field, data, tests) {
        for (let i = 0; i < tests.length; i++) {
            const test = this.stringSplit(tests[i], "-");

            let result;
            if (test.length === 2) {
                result = this.tests[test[0]](field, data, test[1]);
            }
            else {
                result = this.tests[test[0]](field, data);
            }
            if (result) {
                this.errors[this.errors.length] = result;
                return;
            }
        }
    }

    stringSplit(str, separator) {
        const result = [];
        let currentWord = '';

        for (let i = 0; i < str.length; i++) {
            if (str[i] === separator) {
                result[result.length] = currentWord;
                currentWord = '';
            } else {
                currentWord += str[i];
            }
        }

        if (currentWord !== '') {
            result[result.length] = currentWord;
        }

        return result;
    }
}

module.exports = new Validator;