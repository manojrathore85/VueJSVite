<template>
    <form id="signup">
        <div>
            <pre class="mb-3">
        {{ JSON.stringify({ errors }, null, 2) }}
        </pre>
        </div>
        <div class="alert alert-danger" v-if="errors.length > 0">
            <span v-for="error in errors">{{ error }}</span>
        </div>
        <div class="alert alert-success" v-if="message">
            {{ message }}
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
import router from '@/router';
export default {
    data() {
        return {
            errors: [],
            message:null,
            formData: {            
                email: null,
                password: null,                
            }
        }

    },
    computed: {
        validationError() {
            const fv = new FormValidator(this.formData);
            fv.setValidationFields({            
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,                    
                },                
            });
            fv.fvalidate();
            this.errors = fv.errors;
            return this.errors;
        },
    },
    methods: {
        async submitHandler(event) {
            event.preventDefault();
            if (Object.keys(this.validationError.length === 0)) {
                try {
                    // this.formData.api_name = 'register';
                    const response = await axios.post('PHP_JWT', {                        
                        param: this.formData,                        
                        api_name : 'login',
                    });
                    console.log(response);
                    if(response.data.response && response.data.response.status == 200 ){
                        this.message = response.data.response.result;
                        this.resetFormData();
                        localStorage.setItem('authToken', response.data.response.result.token);
                        router.push('/dashboard')
                    }else{
                        this.errors.push(response.data.error.message);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
        resetFormData() {
            // Reset form data to initial state
            this.formData = {                
                email: null,
                password: null,                
            };
        },

    },
}
</script>
