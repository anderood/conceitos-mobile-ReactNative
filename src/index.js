import React, {useEffect, useState} from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function App(){


    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        api.get('/repositories').then(response =>{
            setProjects(response.data)
        });
    }, []);

    async function handleAddProject(){
        const result = await api.post('/repositories', {
            title: `Miguel ${Date.now()}`,
            url: "https://google.com.br",
		    techs: ["MySQL", "React"]
        });

        const project = result.data;

        setProjects([...projects, project ]);
    }

    return( 
        <>
        <SafeAreaView styles={styles.container}>

            <FlatList
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({item: project})=> (
                    <Text style={styles.title}>{project.title}</Text>
                )}
            />

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={handleAddProject}
            >
                <Text style={styles.buttonText}>Adicionar Projeto</Text>
            </TouchableOpacity>

        </SafeAreaView>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        background:'#000',
    },

    title: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold'
    },

    button: {
        backgroundColor: 'blue',
        margin: 40,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center'
    }
})