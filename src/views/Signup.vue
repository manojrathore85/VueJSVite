<template>
    <form id="signup">
        <div>
            <pre class="mb-3">
        {{ JSON.stringify({ formData }, null, 2) }}
        </pre>
        </div>
        <div class="mb-3">
            <label for="exampleInputName" class="form-label">Name</label>
            <input type="email" class="form-control" id="exampleInputName" aria-describedby="emailHelp"
                v-model="formData.name">
            <div id="nameError" class="text-danger" v-if="validationError.name" v-for="error in errors.name">{{ error }}
            </div>
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                v-model="formData.email">
            <div id="emailError" class="text-danger" v-if="validationError.email" v-for="error in errors.email">{{ error }}
            </div>
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputphone" class="form-label">Phone</label>
            <input type="text" class="form-control" id="exampleInputPhone" v-model="formData.phone">
            <div id="phoneError" class="text-danger" v-if="validationError.phone" v-for="error in errors.phone">{{ error }}
            </div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="formData.password">
            <div id="passwordError" class="text-danger" v-if="validationError.password" v-for="error in errors.password">{{
                error }}</div>
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary" @:click="submitHandler">Submit</button>
    </form>
</template>

<script>
import FormValidator from './../module/FormValidator.js';
import { postFormData } from './../module/FormService.js';
import axios from 'axios';
export default {
    data() {
        return {
            errors: [],
            formData: {
                name: null,
                email: null,
                password: null,
                phone: null,
            }
        }

    },
    computed: {
        validationError() {
            const fv = new FormValidator(this.formData);
            fv.setValidationFields({
                name: {
                    required: true,
                    minLength: 10,
                    maxLength: 50,
                },
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                    minLength: 10,
                    maxLength: 50,
                },
                phone: {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    number: true,
                },
            });
            fv.fvalidate();
            this.errors = fv.errors;
            return this.errors;
        },
    },
    methods: {
        async submitHandlerold(event) {
            event.preventDefault();
            if (Object.keys(this.validationError.length === 0)) {
                try {
                    this.formData.name = 'register';
                    console.log();
                    const response = await postFormData('http://localhost/PHP_JWT', this.fromData);
                    console.log('Form submitted successfully:', response);
                    this.resetFormData();
                } catch (error) {
                    console.error('Failed to submit form:', error);
                }
            } else {
                alert("Your form have some validation error resolve them")
            }

            console.log(this.validationError);
        },
        async submitHandler(event) {
            event.preventDefault();
            if (Object.keys(this.validationError.length === 0)) {
                try {
                    // this.formData.api_name = 'register';
                    const response = await axios.post('PHP_JWT', {                        
                        param: this.formData,                        
                        api_name : 'register',
                    });
                    console.log(response);
                    if(response.data.response.status == 200 ){
                        alert(response.data.response.result);
                        this.resetFormData();
                    }else{
                        alert(response.data.error.message);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
        resetFormData() {
            // Reset form data to initial state
            this.formData = {
                name: null,
                email: null,
                password: null,
                phone: null,
            };
        },

    },
}
</script>
