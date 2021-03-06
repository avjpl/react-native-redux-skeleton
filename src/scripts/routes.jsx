import React, { View, Text, Image } from 'react-native';
import Button from 'react-native-button';
import ExNavigator from '@exponent/react-native-navigator';

/*
 FloatFromRight,
 FloatFromBottom,
 PushFromRight,
 ZoomFromFront
*/

const getHomeRoute = () => ({
    // Return a React component class for the scene. It receives a prop
    // called `navigator` that you can use to push on more routes.
    getSceneClass() {
        return require('../components/Welcome/').default;
    },

    // When this scene receives focus, you can run some code. We're just
    // proxying the `didfocus` event that Navigator emits, so refer to
    // Navigator's source code for the semantics.
    onDidFocus(event) {
        console.log('Home Scene received focus.');
    },

    // Return a string to display in the title section of the navigation bar.
    // This route's title is displayed next to the back button when you push
    // a new route on top of this one.
    getTitle() {
        return 'Welcome';
    },

  renderRightButton() {
    return (
      <Button onPress={() => {console.log('Tapped right button'); }}>Log</Button>
    );
  },
});

const getProfileRoute = (profile) => ({
    // You can also render a scene yourself when you need more control over
    // the props of the scene component
    renderScene(navigator) {
        let ProfileScene = require('../components/ProfileScene/').default;
        return <ProfileScene navigator={navigator} profile={profile}/>;
    },

    // There are onWillBlur and onDidBlur events when the scene loses focus.
    // These events occur when another scene will focus or did focus,
    // respectively. The difference between "will" and "did" is the start and
    // end of the scene transition.
    onDidBlur(event) {
        console.log(`Profile Scene for ${profile} lost focus.`);
    },

    // You can render arbitrary views for the title component. Note that you
    // also need to implement getTitle if you want the title of this route to
    // show up in the back button to it.
    renderTitle() {
        return (
            <View style={styles.container}>
                <Image source={{uri: profile.photoUrl}} style={styles.titlePhoto}/>
                <Text style={styles.titleName}>{profile.name}</Text>
            </View>
        );
    },

    getTitle() {
        return profile.name;
    },

    configureScene() {
        return ExNavigator.SceneConfigs.FloatFromBottom;
    },

    // Render the view to display on the right side of the navigation bar. It
    // is typically a button but doesn't have to be.
    renderRightButton() {
        return (
            <Button onPress={() => {console.log('Tapped right button'); }}>Log</Button>
        );
    },
});

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleName: {
        marginLeft: 5,
        fontWeight: 'bold'
    },
    titlePhoto: {
        height: 30,
        width: 30,
        borderRadius: 15,
    }
};

export default {
    getHomeRoute,
    getProfileRoute
};
