import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Button, Alert, TextInput, StyleSheet, SectionList, StatusBar } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    parent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        padding: 20,
        backgroundColor: '#EBE8FC',
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    icon: {
        marginRight: 10,
    },
    picker: {
        width: '100%',
        marginVertical: 10,
    },
    buttonContainer: {
        padding: 10,
    },
});

const datasource = [
    {
        data: [
            { key: 'Guitar', image: "https://thumbs.dreamstime.com/b/guitar-16517374.jpg" },
            { key: 'Bass', image: "https://tmw.com.sg/wp-content/uploads/2020/12/Yamaha-TRBX204-Old-Violin-Sunburst-Electric-Bass-Guitar-Absolute-Piano-The-Music-works.jpg" },
        ],
        title: "Acoustic Instruments",
        bgcolor: "orange",
        icon: "guitar"
    },
    {
        data: [
            { key: 'Tuba', image: "https://thumbs.dreamstime.com/b/f-tuba-29826.jpg" },
            { key: 'Oboe', image: "https://sg.yamaha.com/en/files/YOB-241_Image-Index_ddfa68f1933126b84a92e74af0ecbad7.jpg?impolicy=resize&imwid=396&imhei=396" },
        ],
        title: "Brass And Woodwind Instruments",
        bgcolor: "khaki",
        icon: "music"
    },
    {
        data: [
            { key: 'GuZheng', image: "https://eight-tones.com.sg/wp-content/uploads/2021/05/Shop-Guzheng-Chinese-Instrument-3.jpg" },
            { key: "Erhu", image: "https://kingedwardsmusic.com/wp-content/uploads/2015/04/tumblr_inline_mmwqjl6ipg1qz4rgp.jpg" },
        ],
        title: "Chinese Instruments",
        bgcolor: "lightcoral",
        icon: "music"
    },
];

const App = () => {
    const [name, setName] = useState('');
    const [answers, setAnswers] = useState({});

    const correctAnswers = {
        Guitar: 'Guitar',
        Bass: 'Bass',
        Tuba: 'Tuba',
        Oboe: 'Oboe',
        GuZheng: 'GuZheng',
        Erhu: 'Erhu',
    };

    const handleAnswerChange = (key, value) => {
        // Directly update the answers object using its key.
        const updatedAnswers = { ...answers };
        updatedAnswers[key] = value;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        let score = 0;
        // Loop through the keys in `correctAnswers` and check each one.
        for (let key in correctAnswers) {
            if (answers[key] === correctAnswers[key]) {
                score += 1; // Increment score for each correct answer.
            }
        }

        // Show the result in an alert.
        Alert.alert(`${name} got ${score} out of ${Object.keys(correctAnswers).length} correct!`);
    };


    return (
        <View style={{ flex: 1, paddingTop: 40 }}>
            <StatusBar hidden={true} />
            <ScrollView style={{ flex: 1, margin: 25 }}>
                <TextInput
                    style={{ borderWidth: 1, margin: 20 }}
                    placeholder="Enter your name"
                    onChangeText={(text) => setName(text)}
                />
                <SectionList
                    sections={datasource}
                    renderItem={({ item }) => (
                        <View style={styles.parent}>
                            <View style={{ flex: 1 }}>
                                <RNPickerSelect
                                    onValueChange={(value) => handleAnswerChange(item.key, value)}
                                    items={[
                                        { label: 'GuZheng', value: 'GuZheng' },
                                        { label: 'Tuba', value: 'Tuba' },
                                        { label: 'Erhu', value: 'Erhu' },
                                        { label: 'Guitar', value: 'Guitar' },
                                        { label: 'Oboe', value: 'Oboe' },
                                        { label: 'Bass', value: 'Bass' },

                                    ]}
                                    placeholder={{ label: "Select answer", value: null }}
                                />
                            </View>
                            <Image source={{ uri: item.image }} style={{ width: 160, height: 260 }} />
                        </View>
                    )}
                    renderSectionHeader={({ section: { title, bgcolor, icon } }) => (
                        <View style={[styles.title, { backgroundColor: bgcolor }]}>
                            <Icon name={icon} size={20} color="black" style={styles.icon} />
                            <Text style={styles.headerText}>{title}</Text>
                        </View>
                    )}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Submit Answers" onPress={handleSubmit} />
                </View>
            </ScrollView>
        </View>
    );
};

export default App;
