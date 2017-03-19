import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';
import {Header, Button, CardSection, Spinner} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {loggedIn: null};
        this.renderContent = this.renderContent.bind(this);
    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: '',
            authDomain: '',
            databaseURL: '',
            storageBucket: '',
            messagingSenderId: ''
        });

        firebase.auth().onAuthStateChanged((user) => {
                if(user) {
                    this.setState({loggedIn: true});
                } else {
                    this.setState({loggedIn: false});
                }
            }
        );
    }
    renderContent(){
        switch (this.state.loggedIn){
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm/>
            default:
                return (<View style={{ marginTop: '50%', flexDirection: 'row' , justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch'}}>
                            <Spinner size="large" />
                        </View>);
        }

        if(this.state.loggedIn) {
        }
    }
    render(){
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>
        );
    }
}
export default App;
