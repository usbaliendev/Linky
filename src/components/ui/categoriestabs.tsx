
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect, withLayoutContext } from 'expo-router';
import { Alert, FlatList, Linking,Modal,Text, TouchableOpacity, View } from 'react-native'

import { categories } from "@/utils/categories";
import { Link } from '@/components/link'
import { Option } from '@/components/option'
import { LinkStorage, linkStorage } from '@/storage/link-storage';
import { useState, useCallback } from 'react';
import { colors } from '@/styles/colors';
import { MaterialIcons } from '@expo/vector-icons';

const Tabs = createMaterialTopTabNavigator();

export default function CategoriesTopTabs() {
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
      <Tabs.Navigator >
        {categories.map((category) => (
        <Tabs.Screen
        key={category.id}
        name={category.name}
        options={{
          title: category.name,
        }}
        >
          {() => (
          <FlatList
                data={links}
                keyExtractor={item => item.id}
                renderItem={ ({item})=> (
                  <Link 
                  name={item.name}
                  url={item.url}
                  onDetails={() => handleDetails(item)}/>
                )}
                className='border-t border-gray-600'
                contentContainerStyle={{
                  paddingVertical: 24, // p-6 -> padding 24px
                  paddingBottom: 100,  // pb-24 -> paddingBottom 100px
                  gap: 20,             // gap-5 -> gap between items
                }}
                showsVerticalScrollIndicator={false}
                />
            )}
        </Tabs.Screen>
      ))}
      </Tabs.Navigator>
  );
}