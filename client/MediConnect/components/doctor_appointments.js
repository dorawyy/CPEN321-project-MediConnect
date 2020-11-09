import React from 'react';
import {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class DoctorAppointments extends Component {
  render() {

        return (
            <LinearGradient
            start={{x: 0.0, y: 0.25}}
            end={{x: 0.7, y: 1}}
            colors={['#ffffff', '#ffffff', 'rgba(2, 217, 188, 0.2)']}
            style={styles.LinearGradient}>
                <View style={styles.container}>
                    <View>
                        <TouchableOpacity style={styles.option}>
                            <Text style={styles.optionText}>Notification 1</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.option}>
                            <Text style={styles.optionText}>Notification 2</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.option}>
                            <Text style={styles.optionText}>Notification 3</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.option}>
                            <Text style={styles.optionText}>Notification 4</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.option}>
                            <Text style={styles.optionText}>Notification 5</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>

        );
    }
}

const styles = StyleSheet.create({

    LinearGradient: {
        width: '100%',
        height: '100%',
    },

    container: {
        padding: 30,
    },

    icon: {
        width: 50,
        justifyContent: 'center',
    },

    option: {
        padding: 10,
        borderColor: '#02f0c8',
        borderRadius: 7,
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        margin: 10,
        flexDirection: 'row',
    },

    optionText: {
        fontFamily: 'Iowan Old Style',
        fontSize: 12,
        color: 'black',
    },
    
});

export default DoctorAppointments;
