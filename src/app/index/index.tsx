import { Alert, View, Image, TouchableOpacity, FlatList, Linking, Modal, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { categories } from '@/utils/categories'

import { Categories } from '@/components/categories'
import { Link } from '@/components/link'
import { LinkStorage, linkStorage } from '@/storage/link-storage'
import { Option } from '@/components/option'

import { colors } from '@/styles/colors'
import { styles } from "./styles"

export default function Index() {
    const [category, setCategory] = useState(categories[0].name)
    const [link, setLink] = useState<LinkStorage>({} as LinkStorage)
    const [links, setLinks] = useState<LinkStorage[]>([])
    const [showModal, setShowModal] = useState(false)

    async function getLinks() {
        try {
          const response = await linkStorage.getLinks()
          const filtered = response.filter((link) => link.category === category)
          setLinks(filtered)    
                  
        } catch (error) {
          Alert.alert("Erro", "Não foi possível listar os links")
        }
      }

      function handleDetails(selected: LinkStorage) {
        setShowModal(true)
        setLink(selected);
      }

      async function linkRemove() {
        try {
            await linkStorage.removeLink(link.id)
            getLinks()
            setShowModal(false)
        } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir o link")
            console.log(error)
        }
      }

      async function handleRemove() {
        Alert.alert("Excluir", `Tem certeza que deseja excluir o link ${link.name}?`, [
          {
            text: "Cancelar",
            style: "cancel",
          },
          { text: "Excluir", onPress: () => linkRemove() },
        ])
      }

      async function handleOpen() {
        try {
            await Linking.openURL(link.url)
            setShowModal(false)
        } catch (error) {
            Alert.alert("Erro", "Não foi possível abrir o link")
            console.log(error)
        }
      }

      useFocusEffect(
        useCallback(() => {
          getLinks()
        }, [category])
      ) 

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require("@/assets/logo.png")} style={styles.logo}/>    
                <TouchableOpacity onPress={() => router.navigate("/add")}>
                    <MaterialIcons name="add" size={32} color={colors.green[300]} />
                </TouchableOpacity>
            </View>

            <Categories onChange={setCategory} selected={category} />

            <FlatList
                data={links}
                keyExtractor={item => item.id}
                renderItem={ ({item})=> (
                    <Link 
                    name={item.name}
                    url={item.url}
                    onDetails={() => handleDetails(item)}/>
                )}
                style={styles.links}
                contentContainerStyle={styles.linksContent}
                showsVerticalScrollIndicator={false}
            />

            <Modal transparent visible={showModal} animationType='slide'>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalCategory}>{link.category}</Text>
                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <MaterialIcons name='close' size={20} color={colors.gray[400]}/>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalLinkName}>
                            {link.name}
                        </Text>
                        <Text style={styles.modalLinkURL}>
                            {link.url}
                        </Text>

                        <View style={styles.modalFooter}>
                            <Option name='Excluir' icon='delete' variant='secondary' onPress={handleRemove}/>
                            <Option name='Abrir' icon='language' onPress={handleOpen}/>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}