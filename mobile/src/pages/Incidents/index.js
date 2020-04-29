import React, { useState, useEffect } from 'react';
// importando icons do expo (já vem com esses icones)
import { Feather } from '@expo/vector-icons';
// importando useNavigation -> para usar links ( = useHistory do react)
import { useNavigation } from '@react-navigation/native';
// importando todos os elementos que serão usados (no lugar de tags)
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
// importando api.js
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1); // iniciando na pagina 1
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if(loading) {
            return;
        }

        if(total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });

        setIncidents([... incidents, ... response.data]); // anexando 2 vetores
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    // 2 parâmetros: 1 qual função será executada, 2 que será executada sempre que esses valores mudarem []
    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            {/* FlatList usado para quando temos listas -> ul*/}
            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false} // tira a visualização do scroll
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2} // quando chega nos 20% do final carrega mais
                renderItem={({ item:incident }) => ( // trocando nome item por incident (para facilitar)
                    /* substitui li */
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
