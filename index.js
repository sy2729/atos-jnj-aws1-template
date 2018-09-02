import {} from './index.scss';

var header = {
    template: `
        <nav class="app-header">
            <img class="logo" :src=logoSrc>

            <span class="login" @click=logIn>Log In</span>
        </nav>
    `,
    data: function() {
        return {
            logoSrc: 'xxx',
        }
    },
    methods: {
        logIn(){
            console.log("Log in");
        }
    }
}

var title = {
    template: `
        <h1 class='title title-decoration'>{{appTitle.mainTitle}} - {{appTitle.subTitle}}</h1>
    `,
    props: ['appTitle']
}

var callHistory = {
    template: `
        <div class="history-wrap">
            <h2 class="title">Call History</h2>
            <div class='table-wrap'>
                <table>
                    <tr class="table-header">
                        <th v-for='i in headNames'>{{i}}</th>
                    </tr>
                    <tr v-for='(i, index) in historyData'>
                        <td v-for='j in headNames' v-if="j!=='snow'">{{i[j]}}</td>
                        <td v-for='j in headNames' v-if="j==='snow'"><a :href='i[j]'>View</a></td>
                    </tr>
                </table>
            </div>
        </div>
    `,
    data: function(){
        return {
            headNames: [],
        }
    },
    props: ['historyData'],
    beforeMount(){
        for (let i in this.$props.historyData[0]) {
            this.headNames.push(i);
        }
    
    }

}

var phoneInterface = {
    template: `
        <section class="phone-interface">
            <nav class="app-header">
                <div class="header-left-wrap">
                    <img class="logo" :src=logoSrc>
                    <span class="change-status">change status <i class="fa fa-angle-down"></i></span>
                </div>

                <i class='fa fa-cog'></i>
            </nav>
            <section class="in-app-title-section">
                <h2>{{status}}</h2>
            </section>
            <section class="action-panel">
                <div class="call-wrap">
                    <button @click=dialNum class="btn btn-normal">
                        <i></i><span>Dial Number</span>
                    </button>
                    <button @click=quickConne class="btn btn-normal">
                        <i class="fa fa-address-book"></i><span>Quick connects</span>
                    </button>
                </div>
                <button @click=setAvailable class="btn btn-primary">Set to Available</button>
            </section>
        </section>
    `,
    data: function(){
        return {
            status: 'Offline',
            logoSrc: 'xxxxx',
        }
    },
    methods: {
        dialNum(){
            console.log('dial')
        },
        quickConne(){
            console.log('qucik')
        },
        setAvailable(){
            console.log('setavai')
        }
    }
}

var currentCall = {
    template: `
        <section class="current-call-wrap">
            <h2 class='greeting'>Hello, {{userInfo.name}}!</h2>
            <div class="current-call">
                <p class="prop-display each-info" v-for="(i, key) in currentCall"  v-if="computeName(key) !== false">
                    <span v-text='computeName(key)' class="prop-name"></span>:<span class="prop-value">{{i}}</span>
                </p>
                <a v-for="(i, key) in currentCall" :href=i v-if="key==='snow'">SNOW incident URL</a>
            </div>
        </section>
    `,
    props: ['userInfo', 'currentCall'],
    methods: {
        computeName(data) {
            let string = '';
            switch (data) {
                case 'wwid':
                    string = 'Caller WWID';
                    break;
                case 'number':
                    string = 'Caller Phone';
                    break;
                case 'queue':
                    string = 'Queue';
                    break;
                case 'topic':
                    string = 'Topic';
                    break;            
                // case 'snow':
                //     string = 'SNOW';
                //     break;            
                default:
                    string = false;
                    break;
            }
            return string
        }
    }

}

new Vue({
    el: '#app',
    data: {
        appTitle: {
            mainTitle: 'AWS Connect',
            subTitle: 'J&J GSD Agent Desktop 6'
        },
        callHistory: [
            {
                time: '09:58:57 AM',
                wwid: '3456123',
                number: '+1 214 4032 2355',
                queue: 'English',
                topic: 'hardware problem',
                snow: 'url...',
            },
            {
                time: '09:58:57 AM',
                wwid: '3456123',
                number: '+1 214 4032 2355',
                queue: 'English',
                topic: 'hardware problem',
                snow: 'url...',
            },
            {
                time: '09:58:57 AM',
                wwid: '3456123',
                number: '+1 214 4032 2355',
                queue: 'English',
                topic: 'hardware problem',
                snow: 'url...',
            },
        ],
        userInfo: {
            name: 'Steven',
        },
        currentCall: {
            time: '09:58:57 AM',
            wwid: '3456123',
            number: '+1 214 4032 2355',
            queue: 'English',
            topic: 'hardware problem',
            snow: 'xxxxxxx',
        }
    },
    components: {
        'app-header': header,
        'app-title': title,
        'phone-interface': phoneInterface,
        'current-call': currentCall,
        'call-history': callHistory,
    }
})