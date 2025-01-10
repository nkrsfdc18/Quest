import { LightningElement } from 'lwc';
import createCase from '@salesforce/apex/quest_MSP_Information.createCase';

export default class Quest_MSP_Information extends LightningElement {
//     V3RCExecute()
//     {
//         grecaptcha.execute('6Lcc7R8nAAAAAAFeO6kK-jyFD_FpG7szmyfvO46t', { action: 'action_name' }).then(function (token) {
//             $("#rcToken").val(token);
//         });
//     }
//     setInterval(function () {
//         grecaptcha.ready(function () {
//             V3RCExecute();
//         });
//     }, 90 * 1000);
// <script src="https://www.google.com/recaptcha/api.js?onload=V3RCExecute&amp;render=6Lcc7R8nAAAAAAFeO6kK-jyFD_FpG7szmyfvO46t"></script>

    information = {
        Email: '',
        FirstName: '',
        LastName: '',
        Company: '',
        Phone: '',
        Looking: ''
    }

    handleChange(event) {
        const field = event.target.name;
        this.information[field] = event.target.value;
        console.log(event.target.value);
        console.log(this.information[field])
    }

    handleSubmit(event) {
        console.log('clicked')
        event.preventDefault();
        console.log(this.information);
        createCase({newCase: this.information}).then(result => {

            console.log('Case created');
        }).catch(error => {
            console.log(error);
        })
    }
}